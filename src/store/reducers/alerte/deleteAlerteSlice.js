import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const deleteAlert = createAsyncThunk(
    "alerte/delete",
    async (args) => {
        const URL = BASE_URL + API_URL.Alert ;
        let { data } = await axios.put(URL, args)
        return data[0];
    }

)


const deleteAlerteSlice = createSlice({
    name: 'listeAlerte',
    initialState: {
        deleteStatus: REQUEST_STATUS.idle,
        deleteError: '',
    },
    reducers: {
        initdeleteAlert: (state) => {
            state.deleteStatus = REQUEST_STATUS.idle
            state.deleteError = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(deleteAlert.pending, (state) => {
                state.deleteStatus = REQUEST_STATUS.loading
                state.deleteError = ''
            })
            .addCase(deleteAlert.fulfilled, (state, action) => {
                const { success } = action.payload;
                if (success) {
                    state.deleteStatus = REQUEST_STATUS.succeed
                    state.deleteError = ''
                } else {
                    state.deleteStatus = REQUEST_STATUS.error
                    state.deleteError = 'error-edit-alert'
                }
            })
            .addCase(deleteAlert.rejected, (state) => {
                state.deleteStatus = REQUEST_STATUS.error
                state.deleteError = 'error-network'
            })
    }
})

export default deleteAlerteSlice.reducer;

export const { initdeleteAlert} = deleteAlerteSlice.actions
