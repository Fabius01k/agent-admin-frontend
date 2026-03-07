import { createAsyncThunk } from '@reduxjs/toolkit';
import { agentsApi } from './agents-api';
import type { CreateAgentDto, UpdateAgentNotesDto } from './agents-types';

export const createAgent = createAsyncThunk(
  'agents/create',
  async (data: CreateAgentDto, { rejectWithValue }) => {
    try {
      const agent = await agentsApi.create(data);
      return agent;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create agent');
    }
  }
);

export const searchAgents = createAsyncThunk(
  'agents/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const agents = await agentsApi.search(query);
      return agents;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Search failed');
    }
  }
);

export const getAgentById = createAsyncThunk(
  'agents/getById',
  async (id: string, { rejectWithValue }) => {
    try {
      const agent = await agentsApi.getById(id);
      return agent;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to get agent');
    }
  }
);

export const updateAgentNotes = createAsyncThunk(
  'agents/updateNotes',
  async ({ id, data }: { id: string; data: UpdateAgentNotesDto }, { rejectWithValue }) => {
    try {
      const agent = await agentsApi.updateNotes(id, data);
      return agent;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update notes');
    }
  }
);
