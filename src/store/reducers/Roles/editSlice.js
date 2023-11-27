// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';


const initialState = {

    editStatus: REQUEST_STATUS.idle,
    editError: '',
};

export const editRole = createAsyncThunk(
    "role/edit",
    async (args) => {
        const { data } = await axios.put(`${BASE_URL}${API_URL.EditRole}`, args);
        return data[0]
    }

)

const EditRoleslice = createSlice({
    name: 'checkpoints',
    initialState: initialState,
    reducers: {
        initEditRole: (state) => {
            state.editStatus = REQUEST_STATUS.idle
            state.editError = ''
        }
    }
    ,
    extraReducers: (builder) => {
        builder
            .addCase(editRole.pending, (state) => {
                state.editStatus = REQUEST_STATUS.loading
                state.editError = ''
            })

            .addCase(editRole.fulfilled, (state, action) => {
                const { success, errors } = action.payload;
                if (success) {
                    state.editStatus = REQUEST_STATUS.succeed,
                        state.editError = ''
                } else {
                    let error_msg
                    switch (errors[0].error_code) {
                        case "RL003":
                            error_msg = 'role-exist'
                            break;
                        default:
                            error_msg = 'error-edit-role'
                            break;
                    }
                    state.editStatus = REQUEST_STATUS.error,
                        state.editError = error_msg
                }
            })

            .addCase(editRole.rejected, (state) => {
                state.editStatus = REQUEST_STATUS.error,
                    state.editError = 'error-network'
            })
    }
});

// Reducer
export default EditRoleslice.reducer;

export const { initEditRole } = EditRoleslice.actions


