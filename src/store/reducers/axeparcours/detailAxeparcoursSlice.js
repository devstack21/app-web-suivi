import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';

export const getDetailAxeparcours = createAsyncThunk(
    "axeparcours/detail",
    async (args) => {
        const URL = BASE_URL + API_URL.detailAxeparcours + `?id=${args.id}&page=${args.page}&nbr_ligne=${args.nbre_ligne}`;
        let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const detailAxeparcoursSlice = createSlice({
    name: 'detailAxeparcours',
    initialState: {
        status: REQUEST_STATUS.idle,
        DetailAxe: [],
        error: '',
        nbPages: ''
    },
    reducers: {
        initDetailAxeparcours: (state) => {
            state.status = REQUEST_STATUS.idle
            state.error = ''
            state.DetailAxe = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDetailAxeparcours.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.DetailAxe = []
                state.error = ''
            })
            .addCase(getDetailAxeparcours.fulfilled, (state, action) => {
                const { success, results, nombre_page, errors } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.error = ''
                    state.DetailAxe = results
                    state.nbPages = nombre_page
                } else {
                    state.status = REQUEST_STATUS.error
                    state.error = errors[0].error_msg //'error-list-alert'
                    state.DetailAxe = []
                }
            })
            .addCase(getDetailAxeparcours.rejected, (state) => {
                state.status = REQUEST_STATUS.error
                state.error = 'error-network'
                state.DetailAxe = []
            })
    }
})

export default detailAxeparcoursSlice.reducer;

export const { initDetailAxeparcours } = detailAxeparcoursSlice.actions
