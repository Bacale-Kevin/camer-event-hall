import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "./../../../../utils/baseUrl";

import { loginFormInputs, signUpFormInputs } from "./../../../types/user.types";

export const signUpUser = createAsyncThunk(
  `/api/auth/signup`,
  async (signUpFormData: signUpFormInputs, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.post(`/api/auth/signup`, signUpFormData);

      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  `/api/auth/login`,
  async (loginFormData: loginFormInputs, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.post(`/api/auth/login`, loginFormData);

      return fulfillWithValue(data);
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getLoggedInUser = createAsyncThunk(`/api/auth/me`, async () => {
  try {
    const { data } = await API.get(`/api/auth/me`);

    return data;
  } catch (error: any) {
    console.log(error);
    return error.response.data;
  }
});
