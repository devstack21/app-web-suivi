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
    checkpointsTab: [],
    nbPages: ''
};

export const getListCheckpoints = createAsyncThunk(
    "checkpoints/list",
    async (args) => {
        const { data } = await axios.get(`${BASE_URL}${API_URL.ListCheckpoints}?page=${args.page}&nbr_ligne=10`);
        return data[0]
    }

)

const ListCheckpointslice = createSlice({
    name: 'checkpoints',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getListCheckpoints.pending, (state) => {
                state.listStatus = REQUEST_STATUS.loading
                state.listError = ''
                state.checkpointsTab = []
            })

            .addCase(getListCheckpoints.fulfilled, (state, action) => {
                const { success, results,nombre_page } = action.payload;
                console.log(action.payload)
                if (success) {
                    state.listStatus = REQUEST_STATUS.succeed,
                    state.listError = ''
                    state.checkpointsTab = results
                    state.nbPages = nombre_page
                } else {
                    state.listStatus = REQUEST_STATUS.error,
                    state.listError = 'error-list-accounts'
                    state.checkpointsTab = []
                }
            })

            .addCase(getListCheckpoints.rejected, (state) => {
                state.listStatus = REQUEST_STATUS.error,
                state.listError = 'error-network'
                state.checkpointsTab = []
            })
    }
});

// Reducer
export default ListCheckpointslice.reducer;

