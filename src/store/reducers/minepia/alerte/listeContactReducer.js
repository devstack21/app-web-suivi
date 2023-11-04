import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';

const page = 1;
const nbre_ligne = 100;

const URL = BASE_URL + API_URL.listContacts+`?page=${page}&nbre_ligne=${nbre_ligne}`;
export const listeContact_req = createAsyncThunk(
    "alerte/listeContact", 
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


const listeContactSlice = createSlice({
    name: 'listeContact',
    initialState:{
        loading: false,
        ListContact: [],
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listeContact_req.pending, (state)=>{
            state.loading = true
            state.ListContact = []
            state.error = null
        })
        .addCase(listeContact_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListContact = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListContact = [] 
              state.ListContact = action.payload.results
              state.error = null
            }
        })
        .addCase(listeContact_req.rejected, (state, action)=>{
            state.loading = false
            state.ListContact = []
            state.error = action.error.message
        })
    }
})

export default listeContactSlice.reducer;
