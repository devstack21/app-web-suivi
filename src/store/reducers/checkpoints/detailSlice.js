// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';

// ----------------------------------------------------------------------

const initialState = {

    detailStatus: REQUEST_STATUS.idle,
    detailError: '',
    checkpoint: {},
};

export const getDetailCheckpoint = createAsyncThunk(
    "checkpoints/detail",
    async (args) => {
        const { data } = await axios.get(`${BASE_URL}${API_URL.DetailCheckpoint}${args.id}`);
        return data[0]
    }

)

const DetailCheckpointslice = createSlice({
    name: 'checkpoints',
    initialState: initialState,
    reducers: {
        initDetailCheckpoint: (state) => {
            state.detailStatus = REQUEST_STATUS.idle
            state.detailError = ''
            state.checkpoint = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDetailCheckpoint.pending, (state) => {
                state.detailStatus = REQUEST_STATUS.loading
                state.detailError = ''
                state.checkpoint = {}
            })

            .addCase(getDetailCheckpoint.fulfilled, (state, action) => {
                const { success, results } = action.payload;
                if (success) {
                    state.detailStatus = REQUEST_STATUS.succeed,
                    state.detailError = ''
                    state.checkpoint = results[0]
                } else {
                    state.detailStatus = REQUEST_STATUS.error,
                    state.detailError = 'error-detail-checkpoint'
                    state.checkpoint = {}
                }
            })

            .addCase(getDetailCheckpoint.rejected, (state) => {
                state.detailStatus = REQUEST_STATUS.error,
                state.detailError = 'error-network'
                state.checkpoint = []
            })
    }
});

// Reducer
export default DetailCheckpointslice.reducer;

export const { initDetailCheckpoint } = DetailCheckpointslice.actions
