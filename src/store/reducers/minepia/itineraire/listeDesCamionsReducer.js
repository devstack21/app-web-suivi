import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';



export const listeCamion_req = createAsyncThunk(
    "camion/liste", 
    async(args) =>{
    // const config = {
    //     headers: {
    //     'Authorization ': 'Token ' + getToken(),
    //     'Content-Type': 'application/json'
    // }
    // };
    
    console.log("mon args", args)
    const URL = BASE_URL + API_URL.listeCamion + `?startDate=${args.startDate}&endDate=${args.endDate}&page=${args.page}&nbre_ligne=${args.nbre_ligne}`;
    let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeCamionSlice = createSlice({
    name: 'listeCamion',
    initialState:{
        loading: false,
        ListCamion: [],
        error: null,
        nbPages: 1
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listeCamion_req.pending, (state)=>{
            state.loading = true
            state.ListCamion = []
            state.error = null
            state.nbPages = 1
        })
        .addCase(listeCamion_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListCamion = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListCamion = [] 
              state.ListCamion = action.payload.results
              state.nbPages = action.payload.nombre_page
              state.error = null
            }
        })
        .addCase(listeCamion_req.rejected, (state, action)=>{
            state.loading = false
            state.ListCamion = []
            state.error = action.error.message
            state.nbPages = 1
        })
    }
})

export default listeCamionSlice.reducer;
