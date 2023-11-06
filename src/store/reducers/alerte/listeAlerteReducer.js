import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';

const page = 1;
const nbre_ligne = 100;

const URL = BASE_URL + API_URL.listeAlerte+`?page=${page}&nbre_ligne=${nbre_ligne}`;
export const listeAlerte_req = createAsyncThunk(
    "alerte/listeAlerte", 
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


const listeAlerteSlice = createSlice({
    name: 'listeAlerte',
    initialState:{
        loading: false,
        ListAlerte: [],
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listeAlerte_req.pending, (state)=>{
            state.loading = true
            state.ListAlerte = []
            state.error = null
        })
        .addCase(listeAlerte_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListAlerte = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListAlerte = [] 
              state.ListAlerte = action.payload.results
              state.error = null
            }
        })
        .addCase(listeAlerte_req.rejected, (state, action)=>{
            state.loading = false
            state.ListAlerte = []
            state.error = action.error.message
        })
    }
})

export default listeAlerteSlice.reducer;
