import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';
import moment from 'moment';


const now = moment();

const lastWeek = moment().subtract(1, 'weeks');
const heure_debut1 = lastWeek.startOf('week').format("YYYY-MM-DD HH:mm:ss");
const heure_fin1 = lastWeek.endOf('week').format("YYYY-MM-DD HH:mm:ss");

const heure_debut2 = now.startOf('week').format("YYYY-MM-DD HH:mm:ss");
const heure_fin2 = now.endOf('week').format("YYYY-MM-DD HH:mm:ss");
const id_type_betail = 1;

const urlSuite = `?heure_debut1=${heure_debut1}&heure_fin1=${heure_fin1}&heure_debut2=${heure_debut2}&heure_fin2=${heure_fin2}&id_type_betail=${id_type_betail}`;

const URL = BASE_URL + API_URL.statTypeBetail + urlSuite;
export const statTypeBetail_req = createAsyncThunk(
    "dashboard/statTypeBetail", 
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


const statTypeBetailSlice = createSlice({
    name: 'statTypeBetail',
    initialState:{
        loading: false,
        statTypeBetailList: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(statTypeBetail_req.pending, (state)=>{
            state.loading = true
            state.statTypeBetailList = []
            state.error = null
        })
        .addCase(statTypeBetail_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.statTypeBetailList = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.statTypeBetailList = [] 
              state.statTypeBetailList = action.payload.results
              state.error = null
            }
        })
        .addCase(statTypeBetail_req.rejected, (state, action)=>{
            state.loading = false
            state.statTypeBetailList = []
            // state.error = action.error.message
            state.error = action.error.name
        })
    }
})

export default statTypeBetailSlice.reducer;
