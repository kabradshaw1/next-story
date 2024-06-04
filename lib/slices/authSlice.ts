import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type AuthState = {
  token: string | null;
};

const initialState: AuthState = { token: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state: AuthState, action: PayloadAction<AuthState>) {
      state.token = action.payload.token;
    },
    logout(state: AuthState) {
      state.token = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice;
