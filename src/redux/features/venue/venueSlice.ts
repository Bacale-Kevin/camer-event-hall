import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVenue } from "../../../types/venue.types";

import { addVenue, deleteVenue, getVenues, updateVenue, getVenue } from "./venueActions";

const initialState: IVenue = {
  loading: false,
  venues: [],
  venue: null,
  isError: false,
  isSuccess: false,
  errorMessage: "",
};

const venueTypesSlice = createSlice({
  name: "venues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVenues.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVenues.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state.venues = action.payload;
      state.errorMessage = "";

      return state;
    });
    builder.addCase(getVenues.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.venues = [];
      state.errorMessage = action.payload as string;
    });

    /** GET ONE */
    builder.addCase(getVenue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVenue.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state.venue = action.payload;
      state.errorMessage = "";

      return state;
    });
    builder.addCase(getVenue.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.venue = null;
      state.errorMessage = action.payload as string;
    });

    /** CREATE **/
    builder.addCase(addVenue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addVenue.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state?.venues?.unshift(action.payload);

      return state;
    });
    builder.addCase(addVenue.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload as string;
    });

    /** UPDATE **/
    builder.addCase(updateVenue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateVenue.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state.venues = state.venues?.map((item) => (item.id === action.payload.id ? action.payload : item));

      return state;
    });
    builder.addCase(updateVenue.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload as string;
    });

    /** DELETE **/
    builder.addCase(deleteVenue.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVenue.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = "";
      state.venues = state.venues?.filter((item) => item.id !== action.payload.id);

      return state;
    });
    builder.addCase(deleteVenue.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload as string;
    });
  },
});

export default venueTypesSlice.reducer;
