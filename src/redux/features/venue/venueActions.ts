import { VenueType } from "./../../../types/venue.types";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { API } from "./../../../../utils/baseUrl";

/***** ADD VENUE ******/
export const addVenue = createAsyncThunk(
  `api/venues/create`,
  async (venue: VenueType, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.post(`/api/venues`, { venue });

      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

/***** GET VENUES ******/
export const getVenues = createAsyncThunk(`api/venues`, async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/api/venues`);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

/***** GET VENUE ******/
export const getVenue = createAsyncThunk(`api/venue/id`, async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/api/venues/${id}`);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

/***** DELETE VENUE ******/
export const deleteVenue = createAsyncThunk(`api/venues/id(delete)`, async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await API.delete(`/api/venues/${id}`);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

/***** UPDATE EVENT TYPE ******/
export const updateVenue = createAsyncThunk(`api/venues/id(update)`, async (venue: VenueType, { rejectWithValue }) => {
  try {
    const { id } = venue;
    const { data } = await API.put(`/api/venues/${id}`, { venue });

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
