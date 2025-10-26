import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    id: null as number,
    username: null as string,
    avatar: null as string,
  },
  reducers: {
    setUser(state, { payload }: { payload: { id: number, username: string, avatar: string } }) {
      state.id = payload.id;
      state.username = payload.username;
      state.avatar = payload.avatar;
    },
    logout(state) {
      state.id = null;
      state.username = null;
      state.avatar = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;