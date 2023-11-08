import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
import axios from 'utils/axios';

export const listeRapport_req = createAsyncThunk(
    "rapport/listeRapport", 
    async(args) =>{
    const URL = BASE_URL + API_URL.listeRapports+`?page=${args.page}&nbre_ligne=${args.nbre_ligne}&start_date=${args.start_date}&end_date=${args.end_date}`;
    let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeRapportSlice = createSlice({
    name: 'listeRapport',
    initialState:{
        loading: false,
        ListRapport: [],
        error: null,
        nbPages: 1
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listeRapport_req.pending, (state)=>{
            state.loading = true
            state.ListRapport = []
            state.error = null
            state.nbPages = 1
        })
        .addCase(listeRapport_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListRapport = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListRapport = [] 
              state.ListRapport = action.payload.results
              state.nbPages = action.payload.nombre_page
              state.error = null
            }
        })
        .addCase(listeRapport_req.rejected, (state, action)=>{
            state.loading = false
            state.ListRapport = []
            state.error = action.error.message
            state.nbPages = 1
        })
    }
})

export default listeRapportSlice.reducer;
