import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const getStatImportTypeBetail = createAsyncThunk(
    "dashboard/stat/import/TypeBetail",
    async (arg) => {
        const urlSuite = `?date_debut=${arg.debut}&date_fin=${arg.end}&betail=${arg.betail}`;
        const URL = BASE_URL + API_URL.StatImportTypeBetail + urlSuite;

        let { data } = await axios.get(URL, { withCredentials: true })

        return data[0];
    }

)


const statImportTypeBetailSlice = createSlice({
    name: 'statTypeBetail',
    initialState: {
        status: REQUEST_STATUS.idle,
        result: [],
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getStatImportTypeBetail.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.result = []
                state.error = ''
            })
            .addCase(getStatImportTypeBetail.fulfilled, (state, action) => {
                const { success, results } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.result = results[0]
                    state.error = ''
                } else {
                    state.result = []
                    state.error = 'error-stat-import-type-betail'
                    state.status = REQUEST_STATUS.error
                }
            })
            .addCase(getStatImportTypeBetail.rejected, (state) => {
                state.statTypeBetailList = []
                state.error = 'error-network'
                state.status = REQUEST_STATUS.error
            })
    }
})

export default statImportTypeBetailSlice.reducer;
