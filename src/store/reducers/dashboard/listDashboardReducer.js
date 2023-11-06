import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';
import moment from 'moment';

const lastWeek = moment().subtract(1, 'weeks');
const date_debut = lastWeek.startOf('week').format("YYYY-MM-DD HH:mm:ss");
const date_fin = lastWeek.endOf('week').format("YYYY-MM-DD HH:mm:ss");

const URL = BASE_URL + API_URL.listeDashboard + `?date_debut=${date_debut}&date_fin=${date_fin}`;

export const listeHaut_req = createAsyncThunk(
    "dashboard/haut", 
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


const listeHautSlice = createSlice({
    name: 'listeHaut',
    initialState:{
        loading: false,
        ListHaut: [],
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listeHaut_req.pending, (state)=>{
            state.loading = true
            state.ListHaut = []
            state.error = null
        })
        .addCase(listeHaut_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListHaut = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListHaut = [] 
              state.ListHaut = action.payload.results[0]
              state.error = null
            }
        })
        .addCase(listeHaut_req.rejected, (state, action)=>{
            state.loading = false
            state.ListHaut = []
            state.error = action.error.message
        })
    }
})

export default listeHautSlice.reducer;
