import { createSlice } from "@reduxjs/toolkit";

type UserData = {
  loading: boolean;
  data: string;
  isAuth: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
};

const initialState: UserData = {
  loading: false,
  data: "",
  isAuth: false,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
