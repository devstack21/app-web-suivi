import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';


export const rejeterRapport_req = createAsyncThunk(
    "rapport/rejeterRapport", 
    async(args) =>{
    // const config = {
    //     headers: {
    //     'Authorization ': 'Token ' + getToken(),
    //     'Content-Type': 'application/json'
    // }
    // };
    
    const URL = BASE_URL + API_URL.rejeterRapport;
    let datas = {ids: args.ids}
    let { data } = await axios.post(URL, datas, { withCredentials: true })
        return data[0];
    }

)


const rejeterRapportSlice = createSlice({
    name: 'rejeterRapport',
    initialState:{
        loading: false,
        ListRapportRejeter: [],
        error: null
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(rejeterRapport_req.pending, (state)=>{
            state.loading = true
            state.ListRapportRejeter = []
            state.error = null
        })
        .addCase(rejeterRapport_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              state.ListRapportRejeter = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListRapportRejeter = [] 
              state.ListRapportRejeter = action.payload.results
              state.error = null
            }
        })
        .addCase(rejeterRapport_req.rejected, (state, action)=>{
            state.loading = false
            state.ListRapportRejeter = []
            state.error = action.error.message
        })
    }
})

export default rejeterRapportSlice.reducer;
