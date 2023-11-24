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
    betailTab: [],
    nbPages: ''
};

export const getListToutBetail = createAsyncThunk(
    "betail/list",
    async (args) => {
        const { data } = await axios.get(`${BASE_URL}${API_URL.ListBetail}?page=${args.page}&nbre_ligne=1000`);
        return data[0]
    }

)

const ListToutBetailslice = createSlice({
    name: 'betailTout',
    initialState: initialState,
    reducers: {
        initListBetail: (state) => {
            state.listStatus = REQUEST_STATUS.idle
            state.betailTab = []
        }
    }
    ,
    extraReducers: (builder) => {
        builder
            .addCase(getListToutBetail.pending, (state) => {
                state.listStatus = REQUEST_STATUS.loading
                state.listError = ''
                state.betailTab = []
            })

            .addCase(getListToutBetail.fulfilled, (state, action) => {
                const { success, results,nombre_page } = action.payload;
                if (success) {
                    state.listStatus = REQUEST_STATUS.succeed,
                    state.listError = ''
                    state.betailTab = results
                    state.nbPages = nombre_page
                } else {
                    state.listStatus = REQUEST_STATUS.error,
                    state.listError = 'error-list-betails'
                    state.betailTab = []
                }
            })

            .addCase(getListToutBetail.rejected, (state) => {
                state.listStatus = REQUEST_STATUS.error,
                state.listError = 'error-network'
                state.betailTab = []
            })
    }
});

// Reducer
export default ListToutBetailslice.reducer;

export const { initListToutBetail } = ListToutBetailslice.actions
