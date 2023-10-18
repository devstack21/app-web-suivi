// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';

// ----------------------------------------------------------------------

const initialState = {

    listStatus: REQUEST_STATUS.idle,
    listError: '',
    roleTab: [],
};

export const getListRole = createAsyncThunk(
    "roles/list",
    async (args) => {
        const { data } = await axios.get(`${BASE_URL}${API_URL.ListRole}?page=${args.page}`);
        return data[0]
    }

)

const ListRoleslice = createSlice({
    name: 'role',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getListRole.pending, (state) => {
                state.listStatus = REQUEST_STATUS.loading
                state.listError = ''
                state.roleTab = []
            })

            .addCase(getListRole.fulfilled, (state, action) => {
                const { success, results } = action.payload;
                if (success) {
                    state.listStatus = REQUEST_STATUS.succeed,
                    state.listError = ''
                    state.roleTab = results
                } else {
                    state.listStatus = REQUEST_STATUS.error,
                    state.listError = 'error-list-roles'
                    state.roleTab = []
                }
            })

            .addCase(getListRole.rejected, (state) => {
                state.listStatus = REQUEST_STATUS.error,
                state.listError = 'error-network'
                state.roleTab = []
            })
    }
});

// Reducer
export default ListRoleslice.reducer;

