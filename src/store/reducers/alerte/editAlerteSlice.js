import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const editAlert = createAsyncThunk(
    "alerte/edit",
    async (args) => {
        const URL = BASE_URL + API_URL.Alert ;
        let { data } = await axios.put(URL, args)
        return data[0];
    }

)


const editAlerteSlice = createSlice({
    name: 'listeAlerte',
    initialState: {
        editStatus: REQUEST_STATUS.idle,
        editError: '',
    },
    reducers: {
        initEditAlert: (state) => {
            state.editStatus = REQUEST_STATUS.idle
            state.editError = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(editAlert.pending, (state) => {
                state.editStatus = REQUEST_STATUS.loading
                state.editError = ''
            })
            .addCase(editAlert.fulfilled, (state, action) => {
                const { success } = action.payload;
                if (success) {
                    state.editStatus = REQUEST_STATUS.succeed
                    state.editError = ''
                } else {
                    state.editStatus = REQUEST_STATUS.error
                    state.editError = 'error-edit-alert'
                }
            })
            .addCase(editAlert.rejected, (state) => {
                state.editStatus = REQUEST_STATUS.error
                state.editError = 'error-network'
            })
    }
})

export default editAlerteSlice.reducer;

export const { initEditAlert } = editAlerteSlice.actions
