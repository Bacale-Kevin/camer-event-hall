import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUser } from "./../../../types/user.types";
import { signUpUser, loginUser, getLoggedInUser } from "./authActions";

type UserData = {
  loading: boolean;
  data: string | IUser | null;
  isAuth: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
};

const initialState: UserData = {
  loading: false,
  data: null,
  isAuth: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state.data = action.payload;

      return state;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.data = null;
      state.errorMessage = action.payload as string;
    });

    /** LOGIN USER **/
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAuth = true;
      state.isError = false;
      state.data = action.payload;
      state.errorMessage = "";

      return state;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isAuth = false;
      state.isSuccess = false;
      state.errorMessage = action.payload as string;
    });

    /** GET LOGGEDIN USER **/
    builder.addCase(getLoggedInUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isAuth = true;
      state.isError = false;
      state.data = action.payload;

      return state;
    });
    builder.addCase(getLoggedInUser.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isAuth = false;
      state.isSuccess = false;
      state.errorMessage = action.payload as string;
    });
  },
});

export default authSlice.reducer;
