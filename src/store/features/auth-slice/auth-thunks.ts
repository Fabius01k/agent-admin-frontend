import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from './auth-api';
import { authStorage } from './auth-storage';
import type { LoginCredentials } from './auth-types';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await authApi.login(credentials);
      if (!data.success) {
        return rejectWithValue('Invalid login or password');
      }
      // Generate and store a simple auth token
      const token = btoa(`${credentials.login}:${Date.now()}`);
      authStorage.setToken(token);
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      authStorage.removeToken();
      await authApi.logout();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      if (!authStorage.isAuthenticated()) {
        return rejectWithValue('Not authenticated');
      }
      const data = await authApi.getCurrentUser();
      return data;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to get user');
    }
  }
);
