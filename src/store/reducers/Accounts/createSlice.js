// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';


const initialState = {

    createStatus: REQUEST_STATUS.idle,
    createError: '',
};

export const createAccounts = createAsyncThunk(
    "accounts/create",
    async (args) => {
        const { data } = await axios.post(`${BASE_URL}${API_URL.CreateAccount}`, args);
        return data[0]
    }

)

const CreateAccountslice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        initCreateUser: (state) => {
            state.createStatus = REQUEST_STATUS.idle
            state.createError = ''
        }
    }
    ,
    extraReducers: (builder) => {
        builder
            .addCase(createAccounts.pending, (state) => {
                state.createStatus = REQUEST_STATUS.loading
                state.createError = ''
            })

            .addCase(createAccounts.fulfilled, (state, action) => {
                const { success, errors } = action.payload;
                if (success) {
                    state.createStatus = REQUEST_STATUS.succeed,
                        state.createError = ''
                } else {
                    let error_msg
                    switch (errors[0].error_code) {
                        case "US002":
                            error_msg = 'user-email-exist'
                            break;
                        case "US003":
                            error_msg = 'user-number-exist'
                            break;
                        default:
                            error_msg = 'error-create-account'
                            break;
                    }
                    state.createStatus = REQUEST_STATUS.error,
                    state.createError = error_msg
                    state.accountsTab = []
                }
            })

            .addCase(createAccounts.rejected, (state) => {
                state.createStatus = REQUEST_STATUS.error,
                    state.createError = 'error-network'
                state.accountsTab = []
            })
    }
});

// Reducer
export default CreateAccountslice.reducer;

export const { initCreateUser } = CreateAccountslice.actions


