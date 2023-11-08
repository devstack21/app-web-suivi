import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
import axios from 'utils/axios';



const URL = BASE_URL + API_URL.ListVilles+"?page=1";
export const getListVille = createAsyncThunk(
    "location/list/villes", 
    async() =>{
 
    
    let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeVilleSlice = createSlice({
    name: 'ville',
    initialState:{
        loading: false,
        ListVille: [],
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getListVille.pending, (state)=>{
            state.loading = true
            state.ListVille = []
            state.error = null
        })
        .addCase(getListVille.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListVille = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListVille = [] 
              state.ListVille = action.payload.results
              state.error = null
            }
        })
        .addCase(getListVille.rejected, (state, action)=>{
            state.loading = false
            state.ListVille = []
            state.error = action.error.message
        })
    }
})

export default listeVilleSlice.reducer;
