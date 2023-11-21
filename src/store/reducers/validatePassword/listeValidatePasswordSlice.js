import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';

// const page = 1;
// const nbre_ligne = 10;

export const getListValidatePassword_req = createAsyncThunk(
    "validatePassword/list",
    async (args) => {
        const URL = BASE_URL + API_URL.ListeValidatePassword + `?page=${args.page}&nbre_ligne=${args.nbre_ligne}`;
        let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeValidatePasswordSlice = createSlice({
    name: 'listeValidatePassword',
    initialState: {
        status: REQUEST_STATUS.idle,
        ListVP: [],
        error: '',
        nbPages: ''
    },
    reducers: {
        initListValidatePassword: (state) => {
            state.status = REQUEST_STATUS.idle
            state.error = ''
            state.ListVP = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListValidatePassword_req.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.ListVP = []
                state.error = ''
            })
            .addCase(getListValidatePassword_req.fulfilled, (state, action) => {
                const { success, results, nombre_page } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.error = ''
                    state.ListVP = results
                    state.nbPages = nombre_page
                } else {
                    state.status = REQUEST_STATUS.error
                    state.error = 'error-list-alert'
                    state.ListValidatePassword = []
                }
            })
            .addCase(getListValidatePassword_req.rejected, (state) => {
                state.status = REQUEST_STATUS.error
                state.error = 'error-network'
                state.ListVP = []
            })
    }
})

export default listeValidatePasswordSlice.reducer;

export const { initListValidatePassword } = listeValidatePasswordSlice.actions
