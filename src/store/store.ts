import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/features/auth-slice/auth-slice';
import agentsReducer from '@store/features/agents-slice/agents-slice';
import complaintsReducer from '@store/features/complaints-slice/complaints-slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    agents: agentsReducer,
    complaints: complaintsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
