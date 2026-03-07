import { createSlice } from '@reduxjs/toolkit';
import type { AgentsState } from './agents-types';
import { createAgent, searchAgents, getAgentById, updateAgentNotes } from './agents-thunks';

const initialState: AgentsState = {
  searchResults: [],
  currentAgent: null,
  loading: false,
  error: null,
};

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearCurrentAgent(state) {
      state.currentAgent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create agent
      .addCase(createAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAgent = action.payload;
      })
      .addCase(createAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Search agents
      .addCase(searchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get agent by ID
      .addCase(getAgentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAgent = action.payload;
      })
      .addCase(getAgentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update agent notes
      .addCase(updateAgentNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAgentNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAgent = action.payload;
      })
      .addCase(updateAgentNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentAgent } = agentsSlice.actions;

export default agentsSlice.reducer;
