import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';



export const getListVille = createAsyncThunk(
    "location/list/villes", 
    async() =>{
 
    const URL = BASE_URL + API_URL.ListVilles;

    let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeVilleSlice = createSlice({
    name: 'ville',
    initialState:{
        status: REQUEST_STATUS.loading,
        ListVille: [],
        error: '',
    },
    
    reducers: {
        initListVille: (state) => {
            state.editStatus = REQUEST_STATUS.idle
            state.editError = ''
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getListVille.pending, (state)=>{
            state.status = REQUEST_STATUS.loading
            state.ListVille = []
            state.error = ''
        })
        .addCase(getListVille.fulfilled, (state, action)=>{
        
            const { success, results } = action.payload;
                if (success) {
                    state.status = REQUEST_STATUS.succeed
                    state.ListVille = results
                    state.error = ''
                } else {
                    state.editStatus = REQUEST_STATUS.error
                    state.editError = 'error-list-cities'
                    state.ListVille = []
                }
        })
        .addCase(getListVille.rejected, (state)=>{
            state.editStatus = REQUEST_STATUS.error
            state.editError = 'error-network'
            state.ListVille = []
        })
    }
})

export default listeVilleSlice.reducer;

export const { initListVille } = listeVilleSlice.actions
