import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const createAlert = createAsyncThunk(
    "alerte/create",
    async (args) => {
        const URL = BASE_URL + API_URL.Alert ;
        let { data } = await axios.post(URL, args)
        return data[0];
    }

)


const createAlerteSlice = createSlice({
    name: 'listeAlerte',
    initialState: {
        createStatus: REQUEST_STATUS.idle,
        createError: '',
    },
    reducers: {
        initCreateAlert: (state) => {
            state.createStatus = REQUEST_STATUS.idle
            state.createError = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAlert.pending, (state) => {
                state.createStatus = REQUEST_STATUS.loading
                state.createError = ''
            })
            .addCase(createAlert.fulfilled, (state, action) => {
                const { success } = action.payload;
                if (success) {
                    state.createStatus = REQUEST_STATUS.succeed
                    state.createError = ''
                } else {
                    state.createStatus = REQUEST_STATUS.error
                    state.createError = 'error-edit-alert'
                }
            })
            .addCase(createAlert.rejected, (state) => {
                state.createStatus = REQUEST_STATUS.error
                state.createError = 'error-network'
            })
    }
})

export default createAlerteSlice.reducer;

export const { initCreateAlert } = createAlerteSlice.actions
