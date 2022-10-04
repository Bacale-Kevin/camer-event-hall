import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signUpUser = createAsyncThunk(`/api/signup`, async (userData, { rejectWithValue, fulfillWithValue }) => {
  try {
    const { data } = await axios.post(`/api/signup`, userData);

    return fulfillWithValue(data);
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
