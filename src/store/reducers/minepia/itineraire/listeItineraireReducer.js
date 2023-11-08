import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';
// import { getToken } from "../manageToken";
import axios from 'utils/axios';



export const listeCamionItineraire_req = createAsyncThunk(
    "camion/liste", 
    async(matricule) =>{
        const URL = BASE_URL + API_URL.itineraireCamion + `?matricule=${matricule}`;
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


const listeCamionItineraireSlice = createSlice({
    name: 'listeCamionItineraire',
    initialState:{
        loading: false,
        ListCamionItineraire: [],
        error: null,
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(listeCamionItineraire_req.pending, (state)=>{
            state.loading = true
            state.ListCamionItineraire = []
            state.error = null
        })
        .addCase(listeCamionItineraire_req.fulfilled, (state, action)=>{
            state.loading = false
            if (action.payload.success === 0) {
              // invalid credentials
              state.ListCamionItineraire = []
              state.error = action.payload.errors[0].error_msg
            }else if (action.payload.success === 1){
              state.ListCamionItineraire = [] 
              state.ListCamionItineraire = action.payload.results[0]
              state.error = null
            }
        })
        .addCase(listeCamionItineraire_req.rejected, (state, action)=>{
            state.loading = false
            state.ListCamionItineraire = []
            state.error = action.error.message
        })
    }
})

export default listeCamionItineraireSlice.reducer;
