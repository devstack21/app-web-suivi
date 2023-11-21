import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';

// const page = 1;
// const nbre_ligne = 10;

export const getListAxeparcours = createAsyncThunk(
    "axeparcours/list",
    async (args) => {
        const URL = BASE_URL + API_URL.listeAxeparcours + `?page=${args.page}&nbr_ligne=${args.nbre_ligne}`;
        let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeAxeparcoursSlice = createSlice({
    name: 'listeAxeparcours',
    initialState: {
        status: REQUEST_STATUS.idle,
        ListAxe: [],
        error: '',
        nbPages: ''
    },
    reducers: {
        initListAxeparcours: (state) => {
            state.status = REQUEST_STATUS.idle
            state.error = ''
            state.ListAxe = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListAxeparcours.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.ListAxe = []
                state.error = ''
            })
            .addCase(getListAxeparcours.fulfilled, (state, action) => {
                const { success, results, nombre_page, errors} = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.error = ''
                    state.ListAxe = results
                    state.nbPages = nombre_page
                } else {
                    state.status = REQUEST_STATUS.error
                    state.error = errors[0].error_msg //'error-list-alert'
                    state.ListAxe = []
                }
            })
            .addCase(getListAxeparcours.rejected, (state) => {
                state.status = REQUEST_STATUS.error
                state.error = 'error-network'
                state.ListAxe = []
            })
    }
})

export default listeAxeparcoursSlice.reducer;

export const { initListAxeparcours } = listeAxeparcoursSlice.actions
