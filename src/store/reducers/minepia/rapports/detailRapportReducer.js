import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';


export const detailRapport_req = createAsyncThunk(
    "rapport/listeRapport", 
    async(args) =>{
    // const config = {
    //     headers: {
    //     'Authorization ': 'Token ' + getToken(),
    //     'Content-Type': 'application/json'
    // }
    // };
    
    const URL = BASE_URL + API_URL.detailRapport+`?page=${args.page}&nbre_ligne=${args.nbre_ligne}&date=${args.date}&id_agent=${args.id_agent}`;
    let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const detailRapportSlice = createSlice({
    name: 'detailRapport',
    initialState:{
        loading: false,
        ListdetailRapport: [],
        error: null,
        nbPages: 1
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(detailRapport_req.pending, (state)=>{
            state.loading = true
            state.ListdetailRapport = []
            state.error = null
            state.nbPages = 1
        })
        .addCase(detailRapport_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListdetailRapport = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListdetailRapport = [] 
              state.ListdetailRapport = action.payload.results
              state.nbPages = action.payload.nombre_page
              state.error = null
            }
        })
        .addCase(detailRapport_req.rejected, (state, action)=>{
            state.loading = false
            state.ListdetailRapport = []
            state.error = action.error.message
            state.nbPages = 1
        })
    }
})

export default detailRapportSlice.reducer;
