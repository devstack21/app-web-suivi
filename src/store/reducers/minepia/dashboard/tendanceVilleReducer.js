import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';



const URL = BASE_URL + API_URL.TendanceVilleDashboard;
export const listTendanceVille_req = createAsyncThunk(
    "dashboard/tendanceVille", 
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


const tendanceVilleSlice = createSlice({
    name: 'tendanceVille',
    initialState:{
        loading: false,
        ListTendanceVille: [],
        error: null,
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listTendanceVille_req.pending, (state)=>{
            state.loading = true
            state.ListTendanceVille = []
            state.error = null
        })
        .addCase(listTendanceVille_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListTendanceVille = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
                console.log("success 1", action.payload.results)
              // valid credentials
              state.ListTendanceVille = [] 
              state.ListTendanceVille = action.payload.results
              state.error = null
            }
        })
        .addCase(listTendanceVille_req.rejected, (state, action)=>{
            state.loading = false
            state.ListTendanceVille = []
            // state.error = action.error.message
            state.error = action.error.name
        })
    }
})

export default tendanceVilleSlice.reducer;
