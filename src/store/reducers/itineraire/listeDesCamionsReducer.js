import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';
import moment from 'moment';

const lastWeek = moment().subtract(1, 'weeks');
const startDate = lastWeek.startOf('week').format("YYYY-MM-DD HH:mm:ss");
const endDate = lastWeek.endOf('week').format("YYYY-MM-DD HH:mm:ss");

const URL = BASE_URL + API_URL.listeCamion + `?startDate=${startDate}&endDate=${endDate}`;

export const listeCamion_req = createAsyncThunk(
    "camion/liste", 
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


const listeCamionSlice = createSlice({
    name: 'listeCamion',
    initialState:{
        loading: false,
        ListCamion: [],
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listeCamion_req.pending, (state)=>{
            state.loading = true
            state.ListCamion = []
            state.error = null
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
              state.error = null
            }
        })
        .addCase(listeCamion_req.rejected, (state, action)=>{
            state.loading = false
            state.ListCamion = []
            state.error = action.error.message
        })
    }
})

export default listeCamionSlice.reducer;
