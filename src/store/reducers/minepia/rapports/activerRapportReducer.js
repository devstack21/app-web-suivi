import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';


export const activerRapport_req = createAsyncThunk(
    "rapport/activerRapport", 
    async(args) =>{
    // const config = {
    //     headers: {
    //     'Authorization ': 'Token ' + getToken(),
    //     'Content-Type': 'application/json'
    // }
    // };
    const URL = BASE_URL + API_URL.activerRapport;
    let datas = {date: args.date, id_agent: args.id_agent}
    let { data } = await axios.post(URL, datas, { withCredentials: true })
        return data[0];
    }

)


const activerRapportSlice = createSlice({
    name: 'activerRapport',
    initialState:{
        loading: false,
        ListRapportActiver: [],
        error: null
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(activerRapport_req.pending, (state)=>{
            state.loading = true
            state.ListRapportActiver = []
            state.error = null
        })
        .addCase(activerRapport_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              state.ListRapportActiver = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListRapportActiver = [] 
              state.ListRapportActiver = action.payload.results
              state.error = null
            }
        })
        .addCase(activerRapport_req.rejected, (state, action)=>{
            state.loading = false
            state.ListRapportActiver = []
            state.error = action.error.message
        })
    }
})

export default activerRapportSlice.reducer;
