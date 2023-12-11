import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';



export const getVisitorIndicateurVilles = createAsyncThunk(
    "visitor/indicateurs",
    async (arg) => {
        const urlSuite = `?date_debut=${arg.debut}&date_fin=${arg.end}`;

        const URL = BASE_URL + API_URL.VisitotStatIndicateur + urlSuite;
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

            .addCase(getVisitorIndicateurVilles.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.result = []
                state.error = ''
            })
            .addCase(getVisitorIndicateurVilles.fulfilled, (state, action) => {
                const { success, results, errors } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.result = results[0]
                    state.error = ''
                } else {
                    state.result = []
                    state.error = errors[0].error_code == 'ATK000' ? errors[0].error_msg : 'error-network'
                    state.status = REQUEST_STATUS.error
                }
            })
            .addCase(getVisitorIndicateurVilles.rejected, (state) => {
                state.statTypeBetailList = []
                state.error = 'error-network'
                state.status = REQUEST_STATUS.error
            })
    }
})

export default indicateurVilleSlice.reducer;
