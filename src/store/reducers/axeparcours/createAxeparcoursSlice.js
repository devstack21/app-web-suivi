import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const createAxeparcours = createAsyncThunk(
    "axeparcours/create",
    async (args) => {
        const URL = BASE_URL + API_URL.createAxeparcours ;
        let { data } = await axios.post(URL, args)
        return data[0];
    }

)


const createAxeparcoursSlice = createSlice({
    name: 'createAxeparcours',
    initialState: {
        createStatus: REQUEST_STATUS.idle,
        createError: '',
    },
    reducers: {
        initCreateAxeparcours: (state) => {
            state.createStatus = REQUEST_STATUS.idle
            state.createError = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAxeparcours.pending, (state) => {
                state.createStatus = REQUEST_STATUS.loading
                state.createError = ''
            })
            .addCase(createAxeparcours.fulfilled, (state, action) => {
                const { success, errors } = action.payload;
                if (success) {
                    state.createStatus = REQUEST_STATUS.succeed
                    state.createError = ''
                } else {
                    state.createStatus = REQUEST_STATUS.error
                    state.createError = errors[0].error_msg //'error-edit-alert'
                }
            })
            .addCase(createAxeparcours.rejected, (state) => {
                state.createStatus = REQUEST_STATUS.error
                state.createError = 'error-network'
            })
    }
})

export default createAxeparcoursSlice.reducer;

export const { initCreateAxeparcours } = createAxeparcoursSlice.actions
