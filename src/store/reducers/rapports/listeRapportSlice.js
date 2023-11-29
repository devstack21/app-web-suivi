import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';
import axios from 'utils/axios';


export const getAllReports = createAsyncThunk(
    "rapport/list", 
    async(args) =>{
    const URL = BASE_URL + API_URL.ListReports+`?page=${args.page}&nbre_ligne=${args.nbre_ligne}&start_date=${args.start}&end_date=${args.end}&checkpoint_id=${args.chkpt_id}`;
    let { data } = await axios.get(URL, { withCredentials: true })
        return data[0];
    }

)


const listeRapportSlice = createSlice({
    name: 'listeRapport',
    initialState:{
        status: REQUEST_STATUS.idle,
        ListRapport: [],
        error: "",
        nbPages: ''
    },
    
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(getAllReports.pending, (state)=>{
            state.status = REQUEST_STATUS.loading
            state.ListRapport = []
            state.error = ''
        })
        .addCase(getAllReports.fulfilled, (state, action)=>{
            const { success, results, nombre_page, errors } = action.payload;

            if (success) {
                // invalid credentials
                state.status = REQUEST_STATUS.succeed
                state.ListRapport = results
                state.nbPages = nombre_page
                state.error = ''
            } else  {
                state.ListRapport = []
                state.status = REQUEST_STATUS.error
                state.error = errors[0].error_msg == 'ATK000' ? errors[0].error_msg : 'error-network'
            }
        })
        .addCase(getAllReports.rejected, (state)=>{
          
            state.ListRapport = []
            state.status = REQUEST_STATUS.error
            state.error = 'error-network'
        })
    }
})

export default listeRapportSlice.reducer;
