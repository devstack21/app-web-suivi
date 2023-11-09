import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';



export const getContactList = createAsyncThunk(
    "alerte/liste/Contact",
    async (args) => {
        // const page = 1;
        // const nbre_ligne = 100;
        const URL = BASE_URL + API_URL.Contacts + `?page=${args.page}&nbre_ligne=${args.nbre_ligne}`;

        let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeContactSlice = createSlice({
    name: 'listeContact',
    initialState: {
        status: REQUEST_STATUS.idle,
        ListContact: [],
        error: '',
        nbPages: 1
    },

    reducers: {
        initListContact: (state) => {
            state.editStatus = REQUEST_STATUS.idle
            state.editError = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getContactList.pending, (state) => {
                state.status = REQUEST_STATUS.loading
                state.ListContact = []
                state.error = ''
                state.nbPages = 1
            })
            .addCase(getContactList.fulfilled, (state, action) => {
             
                const { success, results, nombre_page } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.ListContact = results
                    state.nbPages = nombre_page
                    state.editError = ''
                } else {
                    state.editStatus = REQUEST_STATUS.error
                    state.editError = 'error-list-contact'
                    state.ListContact = []
                }
            })
            .addCase(getContactList.rejected, (state) => {
                state.editStatus = REQUEST_STATUS.error
                    state.editError = 'error-network'
                    state.ListContact = []
                    state.nbPages = 1
            })
    }
})

export default listeContactSlice.reducer;

export const { initListContact } = listeContactSlice.actions

