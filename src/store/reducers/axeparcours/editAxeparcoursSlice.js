import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const editAxeparcours = createAsyncThunk(
    "axeparcours/edit",
    async (args) => {
        const URL = BASE_URL + API_URL.updateAxeparcours ;
        let { data } = await axios.put(URL, args)
        return data[0];
    }

)


const editAxeparcoursSlice = createSlice({
    name: 'listeAlerte',
    initialState: {
        editStatus: REQUEST_STATUS.idle,
        editError: '',
    },
    reducers: {
        initEditAxeparcours: (state) => {
            state.editStatus = REQUEST_STATUS.idle
            state.editError = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(editAxeparcours.pending, (state) => {
                state.editStatus = REQUEST_STATUS.loading
                state.editError = ''
            })
            .addCase(editAxeparcours.fulfilled, (state, action) => {
                const { success, errors } = action.payload;
                if (success) {
                    state.editStatus = REQUEST_STATUS.succeed
                    state.editError = ''
                } else {
                    state.editStatus = REQUEST_STATUS.error
                    state.editError = errors[0].error_msg //'error-edit-alert'
                }
            })
            .addCase(editAxeparcours.rejected, (state) => {
                state.editStatus = REQUEST_STATUS.error
                state.editError = 'error-network'
            })
    }
})

export default editAxeparcoursSlice.reducer;

export const { initEditAxeparcours } = editAxeparcoursSlice.actions
