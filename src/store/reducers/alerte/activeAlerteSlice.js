import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const activeAlert = createAsyncThunk(
    "alerte/active",
    async (args) => {
        const URL = BASE_URL + API_URL.activeDesactiveAlerte ;
        let { data } = await axios.post(URL, args)
        return data[0];
    }

)


const activeAlerteSlice = createSlice({
    name: 'activeAlerte',
    initialState: {
        activeStatus: REQUEST_STATUS.idle,
        activeError: '',
    },
    reducers: {
        initalerteAlert: (state) => {
            state.activeStatus = REQUEST_STATUS.idle
            state.activeError = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(activeAlert.pending, (state) => {
                state.activeStatus = REQUEST_STATUS.loading
                state.activeError = ''
            })
            .addCase(activeAlert.fulfilled, (state, action) => {
                const { success, errors } = action.payload;
                if (success) {
                    state.activeStatus = REQUEST_STATUS.succeed
                    state.activeError = ''
                } else {
                    state.activeStatus = REQUEST_STATUS.error
                    state.activeError = errors[0].error_msg //'error-edit-alert'
                }
            })
            .addCase(activeAlert.rejected, (state) => {
                state.activeStatus = REQUEST_STATUS.error
                state.activeError = 'error-network'
            })
    }
})

export default activeAlerteSlice.reducer;

export const { initalerteAlert} = activeAlerteSlice.actions
