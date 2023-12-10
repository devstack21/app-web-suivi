import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const validatePassword_req = createAsyncThunk(
    "validatePassword/create",
    async (args) => {
        const URL = BASE_URL + API_URL.CollecteurResetPassword ;
        let { data } = await axios.post(URL, args)
        return data[0];
    }

)


const validatePasswordSlice = createSlice({
    name: 'validatePassword',
    initialState: {
        resetStatus: REQUEST_STATUS.idle,
        restError: '',
        result: {}
    },
    reducers: {
        initValidatePassword: (state) => {
            state.resetStatus = REQUEST_STATUS.idle
            state.restError = ''
            state.result = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(validatePassword_req.pending, (state) => {
                state.resetStatus = REQUEST_STATUS.loading
                state.restError = ''
            })
            .addCase(validatePassword_req.fulfilled, (state, action) => {
                const { success, errors, results } = action.payload;
                if (success) {
                    state.resetStatus = REQUEST_STATUS.succeed
                    state.restError = ''
                    state.result = results[0]
                } else {
                    state.resetStatus = REQUEST_STATUS.error
                    state.restError = errors[0].error_msg //'error-edit-alert'
                }
            })
            .addCase(validatePassword_req.rejected, (state) => {
                state.resetStatus = REQUEST_STATUS.error
                state.restError = 'error-network'
            })
    }
})

export default validatePasswordSlice.reducer;

export const { initValidatePassword } = validatePasswordSlice.actions
