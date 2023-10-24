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

export const getListBetail = createAsyncThunk(
    "betail/list",
    async (args) => {
        const { data } = await axios.get(`${BASE_URL}${API_URL.ListBetail}?page=${args.page}`);
        return data[0]
    }

)

const ListBetailslice = createSlice({
    name: 'betail',
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
            .addCase(getListBetail.pending, (state) => {
                state.listStatus = REQUEST_STATUS.loading
                state.listError = ''
                state.betailTab = []
            })

            .addCase(getListBetail.fulfilled, (state, action) => {
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

            .addCase(getListBetail.rejected, (state) => {
                state.listStatus = REQUEST_STATUS.error,
                state.listError = 'error-network'
                state.betailTab = []
            })
    }
});

// Reducer
export default ListBetailslice.reducer;

export const { initListBetail } = ListBetailslice.actions
