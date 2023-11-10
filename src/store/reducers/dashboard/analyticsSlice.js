import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';

export const getAnalytics = createAsyncThunk(
    "dashboard/analytics",
    async (arg) => {
        const URL = BASE_URL + API_URL.DashboardAnalytics + `?date_debut=${arg.start}&date_fin=${arg.end}`;

        let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const analyticsSlice = createSlice({
    name: 'analytics',
    initialState: {
        status: REQUEST_STATUS.idle,
        analytics: [],
        error: '',
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAnalytics.pending, (state) => {
                state.status = REQUEST_STATUS.loading
            })
            .addCase(getAnalytics.fulfilled, (state, action) => {
                const { success, results } = action.payload;

                if (success) {
                    // invalid credentials
                    state.status = REQUEST_STATUS.succeed
                    state.analytics = results[0]
                } else  {
                    state.analytics = []
                    state.status = REQUEST_STATUS.error
                    state.error = 'error-analytics'
                }
            })
            .addCase(getAnalytics.rejected, (state) => {
                state.status = REQUEST_STATUS.error
                state.error = 'error-network'
            })
    }
})

export default analyticsSlice.reducer;
