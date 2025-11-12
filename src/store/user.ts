import { createSlice } from '@reduxjs/toolkit';
import type { User } from '@modules/core';
import type { UserState } from './user.types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  unreadNotificationsCount: undefined,
  apiToken: undefined,
  refreshToken: undefined,
  isLoggedIn: false,
} as UserState;

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    removeUser(state) {
      state.user = undefined;
      state.isLoggedIn = false;
    },
    setUnreadNotificationsCount(state, action: PayloadAction<number>) {
      state.unreadNotificationsCount = action.payload;
    },
    removeUnreadNotificationsCount(state) {
      state.unreadNotificationsCount = undefined;
    },
    setApiToken(state, action: PayloadAction<string>) {
      state.apiToken = action.payload;
    },
    removeApiToken(state) {
      state.apiToken = undefined;
      // Set isLoggedIn to false when token is removed
      state.isLoggedIn = false;
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    removeRefreshToken(state) {
      state.refreshToken = undefined;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const {
  setUser,
  removeUser,
  setUnreadNotificationsCount,
  removeUnreadNotificationsCount,
  setApiToken,
  removeApiToken,
  setRefreshToken,
  removeRefreshToken,
  setIsLoggedIn,
} = userSlice.actions;

export default userSlice.reducer;
