// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';

// ----------------------------------------------------------------------

const initialState = {

    editStatus: REQUEST_STATUS.idle,
    editError: '',
};

export const editCheckpoints = createAsyncThunk(
    "checkpoints/edit",
    async (args) => {
        console.log("args", args)
        const { data } = await axios.put(`${BASE_URL}${API_URL.EditCheckpoint}`, args);
        return data[0]
    }

)

const EditCheckpointslice = createSlice({
    name: 'checkpoints',
    initialState: initialState,
    reducers: {
        initEditCheckpoint: (state) => {
            state.editStatus = REQUEST_STATUS.idle
            state.editError = ''
        }
    }
    ,
    extraReducers: (builder) => {
        builder
            .addCase(editCheckpoints.pending, (state) => {
                state.editStatus = REQUEST_STATUS.loading
                state.editError = ''
            })

            .addCase(editCheckpoints.fulfilled, (state, action) => {
                const { success, errors } = action.payload;
                if (success) {
                    state.editStatus = REQUEST_STATUS.succeed,
                        state.editError = ''
                } else {
                    let error_msg
                    switch (errors[0].error_code) {
                        case "CCHP008":
                            error_msg = 'checkpoint-exist'
                            break;
                        case "UCH009":
                            error_msg = 'checkpoint-exist'
                            break;

                        case 'CCHP007':
                            error_msg = 'checkpoint-user-exist'
                            break;
                        default:
                            error_msg = 'error-edit-checkpoint'
                            break;
                    }
                    state.editStatus = REQUEST_STATUS.error,
                        state.editError = error_msg
                }
            })

            .addCase(editCheckpoints.rejected, (state) => {
                state.editStatus = REQUEST_STATUS.error,
                    state.editError = 'error-network'
            })
    }
});

// Reducer
export default EditCheckpointslice.reducer;

export const { initEditCheckpoint } = EditCheckpointslice.actions


