import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';



export const getTransportDetails = createAsyncThunk(
    "transport/detail",
    async (arg) => {
        const URL = BASE_URL + API_URL.TransportItinary 
        + `?matricule=${arg.matricule}&id_supply=${arg.id}&date_debut=${arg.debut}&date_fin=${arg.fin}`;
        let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }
)



const TransportDetailSlice = createSlice({
    name: 'transportDetail',
    initialState: {
        status: REQUEST_STATUS.idle,
        result: [],
        error: null,
    },

    reducers: {
        initDetailTransport: (state) => {
            state.status = REQUEST_STATUS.idle
            state.error = ''
            state.result = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransportDetails.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.result = []
                state.error = null
            })
            .addCase(getTransportDetails.fulfilled, (state, action) => {
                const { success, results } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.error = ''
                    state.result = results
                } else {
                    state.status = REQUEST_STATUS.error
                    state.error = 'error-detail-transports'
                    state.result = []
                }
            })
            .addCase(getTransportDetails.rejected, (state) => {
                state.status = REQUEST_STATUS.error
                    state.error = 'error-network'
                    state.result = []
            })
    }
})

export default TransportDetailSlice.reducer;
export const { initDetailTransport } = TransportDetailSlice.actions
