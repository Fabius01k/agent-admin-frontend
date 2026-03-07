import { createSlice } from '@reduxjs/toolkit';
import type { ComplaintsState } from './complaints-types';
import { createComplaint, getAgentComplaints, getAgentStats } from './complaints-thunks';

const initialState: ComplaintsState = {
  complaints: [],
  stats: {
    week: null,
    month: null,
  },
  pagination: {
    page: 1,
    limit: 20,
    total: 0,
  },
  loading: false,
  error: null,
};

const complaintsSlice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    resetComplaints(state) {
      state.complaints = [];
      state.pagination = { page: 1, limit: 20, total: 0 };
    },
  },
  extraReducers: (builder) => {
    builder
      // Create complaint
      .addCase(createComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComplaint.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get agent complaints
      .addCase(getAgentComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgentComplaints.fulfilled, (state, action) => {
        state.loading = false;
        state.complaints = action.payload.items;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
        };
      })
      .addCase(getAgentComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Get agent stats
      .addCase(getAgentStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAgentStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = {
          week: action.payload.week,
          month: action.payload.month,
        };
      })
      .addCase(getAgentStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, resetComplaints } = complaintsSlice.actions;

export default complaintsSlice.reducer;
