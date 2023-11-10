import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL } from 'utils/apiConfig';

export const rapportPdf_req = createAsyncThunk(
    'rapportPdf/fetch', 
    async (args) => {
        const URL = BASE_URL + API_URL.genererRapport+`?startDate=${args.start_date}&endDate=${args.start_date}`;
        // const response = await axios.get(URL, { responseType: 'blob' });
        await axios.get(URL, { responseType: 'blob' });
    });

export const rapportPdfSlice = createSlice({
  name: 'rapportPdf',
  initialState: { 
    pdf: null, 
    isLoading: false,
    error: null 
    },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(rapportPdf_req.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(rapportPdf_req.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pdf = action.payload;
      })
      .addCase(rapportPdf_req.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default rapportPdfSlice.reducer;
