import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';



const URL = BASE_URL + API_URL.listVilles+"?page=1";
export const listeVille_req = createAsyncThunk(
    "alerte/listeVille", 
    async() =>{
    // const config = {
    //     headers: {
    //     'Authorization ': 'Token ' + getToken(),
    //     'Content-Type': 'application/json'
    // }
    // };
    
    let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeVilleSlice = createSlice({
    name: 'listeVille',
    initialState:{
        loading: false,
        ListVille: [],
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listeVille_req.pending, (state)=>{
            state.loading = true
            state.ListVille = []
            state.error = null
        })
        .addCase(listeVille_req.fulfilled, (state, action)=>{
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
        .addCase(listeVille_req.rejected, (state, action)=>{
            state.loading = false
            state.ListVille = []
            state.error = action.error.message
        })
    }
})

export default listeVilleSlice.reducer;
