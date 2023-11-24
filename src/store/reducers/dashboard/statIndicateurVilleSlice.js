import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';



export const getIndicateurVilles = createAsyncThunk(
    "dashboard/indicateurs",
    async (arg) => {
        const urlSuite = `?date_debut=${arg.debut}&date_fin=${arg.end}`;

        const URL = BASE_URL + API_URL.StatIndicateur + urlSuite;
        let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const indicateurVilleSlice = createSlice({
    name: 'tendanceVille',
    initialState: {
        status: REQUEST_STATUS.idle,
        result: [],
        error: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getIndicateurVilles.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.result = []
                state.error = ''
            })
            .addCase(getIndicateurVilles.fulfilled, (state, action) => {
                const { success, results } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.result = results
                    state.error = ''
                } else {
                    state.result = []
                    state.error = 'error-stat-appro-type-betail'
                    state.status = REQUEST_STATUS.error
                }
            })
            .addCase(getIndicateurVilles.rejected, (state) => {
                state.statTypeBetailList = []
                state.error = 'error-network'
                state.status = REQUEST_STATUS.error
            })
    }
})

export default indicateurVilleSlice.reducer;
