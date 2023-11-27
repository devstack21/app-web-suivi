// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';


const initialState = {

    editStatus: REQUEST_STATUS.idle,
    editError: '',
};

export const editAccounts = createAsyncThunk(
    "accounts/edit",
    async (args) => {
        const { data } = await axios.put(`${BASE_URL}${API_URL.EditAccount}`, args);
        return data[0]
    }

)

const EditAccountslice = createSlice({
    name: 'account',
    initialState: initialState,
    reducers: {
        initEditUser: (state) => {
            state.editStatus = REQUEST_STATUS.idle
            state.editError = ''
        }
    }
    ,
    extraReducers: (builder) => {
        builder
            .addCase(editAccounts.pending, (state) => {
                state.editStatus = REQUEST_STATUS.loading
                state.editError = ''
            })

            .addCase(editAccounts.fulfilled, (state, action) => {
                const { success, errors } = action.payload;
                if (success) {
                    state.editStatus = REQUEST_STATUS.succeed,
                        state.editError = ''
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
                            error_msg = 'error-edit-account'
                            break;
                    }
                    state.editStatus = REQUEST_STATUS.error,
                    state.editError = error_msg
                    state.accountsTab = []
                }
            })

            .addCase(editAccounts.rejected, (state) => {
                state.editStatus = REQUEST_STATUS.error,
                    state.editError = 'error-network'
                state.accountsTab = []
            })
    }
});

// Reducer
export default EditAccountslice.reducer;

export const { initEditUser } = EditAccountslice.actions


