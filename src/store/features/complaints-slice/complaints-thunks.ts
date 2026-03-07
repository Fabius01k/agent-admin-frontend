import { createAsyncThunk } from '@reduxjs/toolkit';
import { complaintsApi } from './complaints-api';
import type { CreateComplaintDto, GetComplaintsParams } from './complaints-types';

export const createComplaint = createAsyncThunk(
  'complaints/create',
  async (data: CreateComplaintDto, { rejectWithValue }) => {
    try {
      const complaint = await complaintsApi.create(data);
      return complaint;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create complaint');
    }
  }
);

export const getAgentComplaints = createAsyncThunk(
  'complaints/getAgentComplaints',
  async ({ agentId, period, page = 1, limit = 20 }: GetComplaintsParams, { rejectWithValue }) => {
    try {
      const response = await complaintsApi.getAgentComplaints(agentId, { period, page, limit });
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to get complaints');
    }
  }
);

export const getAgentStats = createAsyncThunk(
  'complaints/getAgentStats',
  async (agentId: string, { rejectWithValue }) => {
    try {
      const stats = await complaintsApi.getAgentStats(agentId);
      return stats;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to get stats');
    }
  }
);
