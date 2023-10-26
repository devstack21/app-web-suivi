// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';

// ----------------------------------------------------------------------

const initialState = {

    createStatus: REQUEST_STATUS.idle,
    createError: '',
};

export const createCheckpoints = createAsyncThunk(
    "checkpoints/create",
    async (args) => {
        const { data } = await axios.post(`${BASE_URL}${API_URL.CreateCheckpoint}`, args);
        return data[0]
    }

)

const CreateCheckpointlice = createSlice({
    name: 'checkpoints',
    initialState: initialState,
    reducers: {
        initCreateCheckpoint: (state) => {
            state.createStatus = REQUEST_STATUS.idle
            state.createError = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCheckpoints.pending, (state) => {
                state.createStatus = REQUEST_STATUS.loading
                state.createError = ''
            })

            .addCase(createCheckpoints.fulfilled, (state, action) => {
                const { success, errors } = action.payload;
                if (success) {
                    state.createStatus = REQUEST_STATUS.succeed,
                        state.createError = ''
                } else {
                    let error_msg
                    switch (errors[0].error_code) {
                        case "CCHP008":
                            error_msg = 'checkpoint-exist'
                            break;
                        case 'CCHP007':
                            error_msg = 'checkpoint-user-exist'
                            break;
                        default:
                            error_msg = 'error-create-checkpoint'
                            break;
                    }
                    state.createStatus = REQUEST_STATUS.error,
                    state.createError = error_msg
                    state.accountsTab = []
                }
            })

            .addCase(createCheckpoints.rejected, (state) => {
                state.createStatus = REQUEST_STATUS.error,
                    state.createError = 'error-network'
                state.accountsTab = []
            })
    }
});

// Reducer
export default CreateCheckpointlice.reducer;

export const { initCreateCheckpoint } = CreateCheckpointlice.actions


