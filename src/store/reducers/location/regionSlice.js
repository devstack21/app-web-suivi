import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';



const URL = BASE_URL + API_URL.ListRegions;
export const getRegions = createAsyncThunk(
    "locations/list/regions",
    async () => {

        let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeRegionSlice = createSlice({
    name: 'listeRegion',
    initialState: {
        status: REQUEST_STATUS.idle,
        regionTab: [],
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRegions.pending, (state) => {
                state.status = REQUEST_STATUS.loading
            })
            .addCase(getRegions.fulfilled, (state, action) => {
                const { success, results } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed,
                        state.error = ''
                    state.regionTab = results
                } else {
                    state.status = REQUEST_STATUS.error,
                        state.listError = 'error-list-regions'
                    state.regionTab = []
                }
            })
            .addCase(getRegions.rejected, (state) => {
                state.status = REQUEST_STATUS.error,
                    state.listError = 'error-network'
                state.regionTab = []
            })
    }
})

export default listeRegionSlice.reducer;
