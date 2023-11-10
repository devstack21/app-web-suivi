import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const getListTransport = createAsyncThunk(
    "transport/list",
    async (arg) => {
        try {
            const urlSuite = `?startDate=${arg.start}&endDate=${arg.end}&page=${arg.page}&nbre_ligne=${arg.nb}`;
            const URL = BASE_URL + API_URL.ListTransport + urlSuite
            let { data } = await axios.get(URL, { withCredentials: true })
            return data[0];

        } catch (e) {
            console.log(e)
        }
    }

)


const listTransportSlice = createSlice({
    name: 'listeCamion',
    initialState: {
        status: REQUEST_STATUS.idle,
        ListCamion: [],
        error: null,
        nbPages: ''

    },
    reducers: {
        initListTransport: (state) => {
            state.status = REQUEST_STATUS.idle
            state.error = ''
            state.ListCamion = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListTransport.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.ListCamion = []
                state.error = null
            })
            .addCase(getListTransport.fulfilled, (state, action) => {
                const { success, results, nombre_page } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed,
                        state.error = ''
                    state.ListCamion = results
                    state.nbPages = nombre_page
                } else {
                    state.status = REQUEST_STATUS.error,
                        state.error = 'error-list-transports'
                    state.ListCamion = []
                }
            })
            .addCase(getListTransport.rejected, (state) => {

                state.status = REQUEST_STATUS.error,
                    state.error = 'error-network'
                state.ListCamion = []
            })
    }
})

export default listTransportSlice.reducer;
export const { initListTransport } = listTransportSlice.actions
