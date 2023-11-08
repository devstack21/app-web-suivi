import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';

const page = 1;
const nbre_ligne = 10;

export const getListAlerts = createAsyncThunk(
    "alerte/list",
    async () => {
        const URL = BASE_URL + API_URL.Alert + `?page=${page}&nbre_ligne=${nbre_ligne}`;
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
                const { success, results } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.error = ''
                    state.ListAlerte = results
                } else {
                    state.status = REQUEST_STATUS.error
                    state.error = 'error-list-alert'
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
