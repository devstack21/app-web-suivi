// third-party
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// project imports
import axios from 'utils/axios';
import { BASE_URL } from 'config';
import { API_URL, REQUEST_STATUS } from 'utils/apiConfig';

// ----------------------------------------------------------------------

const initialState = {

    listStatus: REQUEST_STATUS.idle,
    listError: '',
    agentsTab: [],
    nbPages: ''
};

export const getListAgentCheckpoints = createAsyncThunk(
    "checkpoints/list/agent",
    async (args) => {
        let url = `${BASE_URL}${API_URL.ListAgentCheckpoints}?page=${args.page}&nbre_line=${args.nb}`
        if (args.agt_chk) url += '&agt_chk'
        const { data } = await axios.get(url);
        return data[0]
    }

)

const ListAgentCheckpointslice = createSlice({
    name: 'checkpoints-agent',
    initialState: initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getListAgentCheckpoints.pending, (state) => {
                state.listStatus = REQUEST_STATUS.loading
                state.listError = ''
                state.agentsTab = []
            })

            .addCase(getListAgentCheckpoints.fulfilled, (state, action) => {
                const { success, results,nombre_page } = action.payload;
                if (success) {
                    state.listStatus = REQUEST_STATUS.succeed,
                    state.listError = ''
                    state.agentsTab = results
                    state.nbPages = nombre_page
                } else {
                    state.listStatus = REQUEST_STATUS.error,
                    state.listError = 'error-list-agent-checkpoint'
                    state.agentsTab = []
                }
            })

            .addCase(getListAgentCheckpoints.rejected, (state) => {
                state.listStatus = REQUEST_STATUS.error,
                state.listError = 'error-network'
                state.agentsTab = []
            })
    }
});

// Reducer
export default ListAgentCheckpointslice.reducer;

