import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';

// const page = 1;
// const nbre_ligne = 10;

export const getListAlerts = createAsyncThunk(
    "alerte/list",
    async (args) => {
        const URL = BASE_URL + API_URL.Alert + `?page=${args.page}&nbre_ligne=${args.nbre_ligne}`;
        let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeAlerteSlice = createSlice({
    name: 'listeAlerte',
    initialState: {
        status: REQUEST_STATUS.idle,
        ListAlerte: [],
        error: '',
        nbPages: ''
    },
    reducers: {
        initListAlert: (state) => {
            state.status = REQUEST_STATUS.idle
            state.error = ''
            state.ListAlerte = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListAlerts.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.ListAlerte = []
                state.error = ''
            })
            .addCase(getListAlerts.fulfilled, (state, action) => {
                const { success, results, nombre_page, errors } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.error = ''
                    state.ListAlerte = results
                    state.nbPages = nombre_page
                } else {
                    state.status = REQUEST_STATUS.error
                    state.error = errors[0].error_msg
                    state.ListAlerte = []
                }
            })
            .addCase(getListAlerts.rejected, (state) => {
                state.status = REQUEST_STATUS.error
                state.error = 'error-network'
                state.ListAlerte = []
            })
    }
})

export default listeAlerteSlice.reducer;

export const { initListAlert } = listeAlerteSlice.actions
