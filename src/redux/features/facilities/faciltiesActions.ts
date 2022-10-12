import { Facility } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { API } from "./../../../../utils/baseUrl";

/***** CREATE  FACILITY ******/
export const createFacility = createAsyncThunk(
  `/api/facilities/create`,
  async (name: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.post(`/api/facilities`, { name });


      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

/***** GET ALL FACILITIES ******/
export const getFacilities = createAsyncThunk(`/api/facilities`, async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/api/facilities`);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

/***** GET SINGLE FACILITY ******/
export const getFacility = createAsyncThunk(`/api/facilities/getOne`, async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/api/facilities/${id}`);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

/***** DELETE FACILITY ******/
export const deleteFacility = createAsyncThunk(`DELETE FACILITY`, async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await API.delete(`/api/facilities/${id}`);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

/***** UPDATE EVENT TYPE ******/
export const updateFacility = createAsyncThunk(`UPDATE FACILITY`, async (values: Facility, { rejectWithValue }) => {
  try {
    const { id, name } = values;
    const { data } = await API.put(`/api/facilities/${id}`, { name });

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
