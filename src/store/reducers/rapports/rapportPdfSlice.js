import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';

export const getRapportPDF = createAsyncThunk(
  'rapport/fetch/pdf',
  async (args) => {
    const URL = BASE_URL + API_URL.GenerateReport + `?date_debut=${args.start}&date_fin=${args.end}`;
    // const response = await axios.get(URL, { responseType: 'blob' });
    await axios.get(URL, { responseType: 'blob' });
  });

export const rapportPdfSlice = createSlice({
  name: 'rapportPdf',
  initialState: {
    pdf: null,
    status: REQUEST_STATUS.idle,
    error: ""
  },
  reducers: {
    initGetPdf: (state) => {
      state.status = REQUEST_STATUS.idle
      state.error = ''
      state.pdf = null
  }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getRapportPDF.pending, (state) => {
        state.status = REQUEST_STATUS.loading;
      })
      .addCase(getRapportPDF.fulfilled, (state, action) => {

        const { success } = action.payload;

        if (success) {
          // invalid credentials
          state.status = REQUEST_STATUS.succeed
          state.pdf = action.payload
          state.error = ''
        } else {
          state.pdf = null
          state.status = REQUEST_STATUS.error
          state.error = 'error-reports-pdf'
        }
      })
      .addCase(getRapportPDF.rejected, (state) => {
        state.pdf = null
        state.status = REQUEST_STATUS.error
        state.error = 'error-network'
      });
  },
});

export default rapportPdfSlice.reducer;
export const { initGetPdf } = rapportPdfSlice.actions
