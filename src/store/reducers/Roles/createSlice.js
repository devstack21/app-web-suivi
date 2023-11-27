// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';


const initialState = {

    createStatus: REQUEST_STATUS.idle,
    createError: '',
};

export const createRole = createAsyncThunk(
    "role/create",
    async (args) => {
        const { data } = await axios.post(`${BASE_URL}${API_URL.CreateRole}`, args);
        return data[0]
    }

)

const CreateRoleSlice = createSlice({
    name: 'role',
    initialState: initialState,
    reducers: {
        initCreateRole: (state) => {
            state.createStatus = REQUEST_STATUS.idle
            state.createError = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createRole.pending, (state) => {
                state.createStatus = REQUEST_STATUS.loading
                state.createError = ''
            })

            .addCase(createRole.fulfilled, (state, action) => {
                const { success, errors } = action.payload;
                if (success) {
                    state.createStatus = REQUEST_STATUS.succeed,
                        state.createError = ''
                } else {
                    let error_msg
                    switch (errors[0].error_code) {
                        case "RL003":
                            error_msg = 'role-exist'
                            break;
                        default:
                            error_msg = 'error-create-role'
                            break;
                    }
                    state.createStatus = REQUEST_STATUS.error,
                    state.createError = error_msg
                }
            })

            .addCase(createRole.rejected, (state) => {
                state.createStatus = REQUEST_STATUS.error,
                state.createError = 'error-network'
                state.accountsTab = []
            })
    }
});

// Reducer
export default CreateRoleSlice.reducer;

export const { initCreateRole } = CreateRoleSlice.actions


