// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';

// ----------------------------------------------------------------------

const initialState = {

    listStatus: REQUEST_STATUS.idle,
    listError: '',
    accountsTab: [],
    nbPages: ''
};

export const getListAccounts = createAsyncThunk(
    "accounts/list",
    async (args) => {
        let filter = ''
        if (args.role) filter = `&role=${args.role}`
        const { data } = await axios.get(`${BASE_URL}${API_URL.ListAccounts}?page=${args.page}&nbre_line=${args.nb}${filter}`);
        return data[0]
    }

)

const ListAccountslice = createSlice({
    name: 'account',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getListAccounts.pending, (state) => {
                state.listStatus = REQUEST_STATUS.loading
                state.listError = ''
                state.accountsTab = []
            })

            .addCase(getListAccounts.fulfilled, (state, action) => {
                const { success, results, nombre_page, errors } = action.payload;
                if (success) {
                    state.listStatus = REQUEST_STATUS.succeed,
                    state.listError = ''
                    state.accountsTab = results
                    state.nbPages = nombre_page
                } else {
                    state.listStatus = REQUEST_STATUS.error,
                    state.listError = errors[0].error_msg
                    state.accountsTab = []
                }
            })

            .addCase(getListAccounts.rejected, (state) => {
                state.listStatus = REQUEST_STATUS.error,
                state.listError = 'error-network'
                state.accountsTab = []
            })
    }
});

// Reducer
export default ListAccountslice.reducer;

