import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';



const URL = BASE_URL + API_URL.ListeTypeBetail + "?page=*";
export const getListTypeBetail = createAsyncThunk(
    "betail/list/type",
    async () => {
        let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeTypeBetailSlice = createSlice({
    name: 'listeTypeBetail',
    initialState: {
        status: REQUEST_STATUS.idle,
        typeBetail: [],
        error: '',
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListTypeBetail.pending, (state) => {
                state.status = REQUEST_STATUS.loading
            })
            .addCase(getListTypeBetail.fulfilled, (state, action) => {
                const { success, results } = action.payload;

                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.typeBetail = results
                } else  {
                    state.status = REQUEST_STATUS.error
                    state.error = 'error-type-betail'
                }
            })
            .addCase(getListTypeBetail.rejected, (state) => {
                state.status = REQUEST_STATUS.error
                state.error = 'error-network'
            })
    }
})

export default listeTypeBetailSlice.reducer;
