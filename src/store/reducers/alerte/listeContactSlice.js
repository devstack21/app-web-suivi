import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';



export const getContactList = createAsyncThunk(
    "alerte/liste/Contact",
    async () => {

        const page = 1;
        const nbre_ligne = 100;
        const URL = BASE_URL + API_URL.Contacts + `?page=${page}&nbre_ligne=${nbre_ligne}`;

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
            })
            .addCase(getContactList.fulfilled, (state, action) => {
             
                const { success, results } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.ListContact = results
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
            })
    }
})

export default listeContactSlice.reducer;

export const { initListContact } = listeContactSlice.actions

