import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';



const URL = BASE_URL + API_URL.listeRegions+"?page=1";
export const listeRegion_req = createAsyncThunk(
    "dashboard/listeRegion", 
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


const listeRegionSlice = createSlice({
    name: 'listeRegion',
    initialState:{
        loading: false,
        ListRegion: [],
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listeRegion_req.pending, (state)=>{
            state.loading = true
            state.ListRegion = []
            state.error = null
        })
        .addCase(listeRegion_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListRegion = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListRegion = [] 
              state.ListRegion = action.payload.results
              state.error = null
            }
        })
        .addCase(listeRegion_req.rejected, (state, action)=>{
            state.loading = false
            state.ListRegion = []
            state.error = action.error.message
        })
    }
})

export default listeRegionSlice.reducer;
