import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { registerThunk, loginThunk, logoutThunk } from "./authOperations";

const initialState = {
  user: {
    id: null,
    name: null,
    email: null,
    avatar: null,
  },
  isChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    refreshUser: (state, { payload }) => {
      state.user = payload.user;
      state.isChange = payload.isChange;
    },
    updateAvatar: (state, { payload }) => {
      state.user.avatar = payload.photo;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = initialState.user;
        state.isChange = initialState.isChange;
      })
      .addMatcher(
        isAnyOf(registerThunk.fulfilled, loginThunk.fulfilled),
        (state, { payload }) => {
          state.user = payload.user;
          state.isChange = true;
        }
      );
  },
});

export const authReducer = authSlice.reducer;

export const { refreshUser, updateAvatar } = authSlice.actions;
