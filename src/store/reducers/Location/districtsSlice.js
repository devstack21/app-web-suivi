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
    districtsTab: [],
};

export const getListDistricts = createAsyncThunk(
    "districts/list",
    async () => {
        const { data } = await axios.get(`${BASE_URL}${API_URL.ListDistrcits}`);
        return data[0]
    }

)

const ListDistrictslice = createSlice({
    name: 'districts',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getListDistricts.pending, (state) => {
                state.listStatus = REQUEST_STATUS.loading
                state.listError = ''
                state.districtsTab = []
            })

            .addCase(getListDistricts.fulfilled, (state, action) => {
                const { success, results } = action.payload;
                if (success) {
                    state.listStatus = REQUEST_STATUS.succeed,
                    state.listError = ''
                    state.districtsTab = results
                } else {
                    state.listStatus = REQUEST_STATUS.error,
                    state.listError = 'error-list-districts'
                    state.districtsTab = []
                }
            })

            .addCase(getListDistricts.rejected, (state) => {
                state.listStatus = REQUEST_STATUS.error,
                state.listError = 'error-network'
                state.districtsTab = []
            })
    }
});

// Reducer
export default ListDistrictslice.reducer;

