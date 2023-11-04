import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';
import moment from 'moment';

const lastWeek = moment().subtract(1, 'weeks');
const date_debut = lastWeek.startOf('week').format("YYYY-MM-DD HH:mm:ss");
const date_fin = lastWeek.endOf('week').format("YYYY-MM-DD HH:mm:ss");
const nbre_ligne = 100

const URL = BASE_URL + API_URL.statCkeckpoint + `?date_debut=${date_debut}&date_fin=${date_fin}&page=1&nbre_ligne=${nbre_ligne}`;

export const statCheckpoint_req = createAsyncThunk(
    "dashboard/statCheckpoint", 
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


const statCheckpointSlice = createSlice({
    name: 'statCheckpoint',
    initialState:{
        loading: false,
        ListStatChpt: [],
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(statCheckpoint_req.pending, (state)=>{
            state.loading = true
            state.ListStatChpt = []
            state.error = null
        })
        .addCase(statCheckpoint_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListStatChpt = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListStatChpt = [] 
              state.ListStatChpt = action.payload.results
              state.error = null
            }
        })
        .addCase(statCheckpoint_req.rejected, (state, action)=>{
            state.loading = false
            state.ListStatChpt = []
            state.error = action.error.message
        })
    }
})

export default statCheckpointSlice.reducer;
