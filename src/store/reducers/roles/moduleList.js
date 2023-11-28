// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';


const initialState = {

    listStatus: REQUEST_STATUS.idle,
    listError: '',
    moduleTab: [],
};

export const getListModule = createAsyncThunk(
    "modules/list",
    async () => {
        const { data } = await axios.get(`${BASE_URL}${API_URL.ListModule}`);
        return data[0]
    }

)

const ListModuleSlice = createSlice({
    name: 'role',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getListModule.pending, (state) => {
                state.listStatus = REQUEST_STATUS.loading
                state.listError = ''
                state.moduleTab = []
            })

            .addCase(getListModule.fulfilled, (state, action) => {
                const { success, results, errors } = action.payload;
                if (success) {
                    state.listStatus = REQUEST_STATUS.succeed,
                    state.listError = ''
                    state.moduleTab = results
                } else {
                    let msg
                    switch (errors[0].error_code) {
                        case "ATK000":
                            msg = 'error-habilitations'
                            break;
                    
                        default:
                            msg = 'error-network'
                            break;
                    }
                    state.listStatus = REQUEST_STATUS.error,
                    state.listError = msg
                    state.moduleTab = []
                }
            })

            .addCase(getListModule.rejected, (state) => {
                state.listStatus = REQUEST_STATUS.error,
                state.listError = 'error-network'
                state.moduleTab = []
            })
    }
});

// Reducer
export default ListModuleSlice.reducer;

