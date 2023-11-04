import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';



const URL = BASE_URL + API_URL.ListeTypeBetail+"?page=1";
export const listeTypeBetail_req = createAsyncThunk(
    "dashboard/listeTypeBetail", 
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


const listeTypeBetailSlice = createSlice({
    name: 'listeTypeBetail',
    initialState:{
        loading: false,
        ListTypeBetail: [],
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listeTypeBetail_req.pending, (state)=>{
            state.loading = true
            state.ListTypeBetail = []
            state.error = null
        })
        .addCase(listeTypeBetail_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListTypeBetail = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
                console.log("success 1", action.payload.results)
              // valid credentials
              state.ListTypeBetail = [] 
              state.ListTypeBetail = action.payload.results
              state.error = null
            }
        })
        .addCase(listeTypeBetail_req.rejected, (state, action)=>{
            state.loading = false
            state.ListTypeBetail = []
            state.error = action.error.message
        })
    }
})

export default listeTypeBetailSlice.reducer;
