import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const getStatTypeBetail = createAsyncThunk(
    "dashboard/stat/type/betail",
    async (arg) => {
        const urlSuite = `?date_debut=${arg.debut}&date_fin=${arg.end}`;
        const URL = BASE_URL + API_URL.StatTypeBetail + urlSuite;

        let { data } = await axios.get(URL, { withCredentials: true })

        return data[0];
    }

)


const statTypeBetailSlice = createSlice({
    name: 'statTypeBetail',
    initialState: {
        status: REQUEST_STATUS.idle,
        result: [],
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStatTypeBetail.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.result = []
                state.error = ''
            })
            .addCase(getStatTypeBetail.fulfilled, (state, action) => {
                const { success, results } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.result = results[0]
                    state.error = ''
                } else {
                    state.result = []
                    state.error = 'error-stat-type-betail'
                    state.status = REQUEST_STATUS.error
                }
            })
            .addCase(getStatTypeBetail.rejected, (state) => {
                state.statTypeBetailList = []
                state.error = 'error-network'
                state.status = REQUEST_STATUS.error
            })
    }
})

export default statTypeBetailSlice.reducer;
