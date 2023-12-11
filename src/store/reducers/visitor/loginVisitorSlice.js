import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';

export const loginVisitor = createAsyncThunk(
    "visitor/login",
    async (arg) => {
        const URL = BASE_URL + API_URL.LoginVisitor;
        let { data } = await axios.post(URL, {code:arg.code})
        return data[0];
    }

)


const loginVisitorSlice = createSlice({
    name: 'visitor',
    initialState: {
        status: REQUEST_STATUS.idle,
        error: '',
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginVisitor.pending, (state) => {
                state.status = REQUEST_STATUS.loading
            })
            .addCase(loginVisitor.fulfilled, (state, action) => {
                const { success } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                } else  {
                    state.status = REQUEST_STATUS.error
                    state.error = 'code-incorect'
                }
            })
            .addCase(loginVisitor.rejected, (state) => {
                state.status = REQUEST_STATUS.error
                state.error = 'error-network'
            })
    }
})

export default loginVisitorSlice.reducer;
