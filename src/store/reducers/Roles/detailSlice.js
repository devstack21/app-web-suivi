// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';


const initialState = {

    detailStatus: REQUEST_STATUS.idle,
    detailError: '',
    role: {},
};

export const getDetailRole = createAsyncThunk(
    "role/detail",
    async (args) => {
        const { data } = await axios.get(`${BASE_URL}${API_URL.DetailRole}?pk=${args.pk}`);
        return data[0]
    }

)

const DetailCheckpointslice = createSlice({
    name: 'role',
    initialState: initialState,
    reducers: {
        initDetailRole: (state) => {
            state.detailStatus = REQUEST_STATUS.idle
            state.detailError = ''
            state.role = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDetailRole.pending, (state) => {
                state.detailStatus = REQUEST_STATUS.loading
                state.detailError = ''
                state.role = {}
            })

            .addCase(getDetailRole.fulfilled, (state, action) => {
                const { success, results } = action.payload;
                if (success) {
                    state.detailStatus = REQUEST_STATUS.succeed,
                    state.detailError = ''
                    state.role = results[0]
                } else {
                    state.detailStatus = REQUEST_STATUS.error,
                    state.detailError = 'error-detail-role'
                    state.role = {}
                }
            })

            .addCase(getDetailRole.rejected, (state) => {
                state.detailStatus = REQUEST_STATUS.error,
                state.detailError = 'error-network'
                state.role = []
            })
    }
});

// Reducer
export default DetailCheckpointslice.reducer;

export const { initDetailRole } = DetailCheckpointslice.actions
