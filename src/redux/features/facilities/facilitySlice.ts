import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getFacilities, createFacility, deleteFacility, updateFacility } from "./faciltiesActions";
import { IFacility } from "./../../../types/facility.types";

const initialState: IFacility = {
  loading: false,
  facilities: [],
  facility: null,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  successMessage: "",
};

const faciltySlice = createSlice({
  name: "venuetypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFacilities.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFacilities.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state.facilities = action.payload;
      state.errorMessage = "";

      return state;
    });
    builder.addCase(getFacilities.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.facilities = [];
      state.errorMessage = action.payload as string;
    });

    /** CREATE **/
    builder.addCase(createFacility.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createFacility.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state?.facilities?.unshift(action.payload.createdFacility);
      state.successMessage = action.payload.message;

      return state;
    });
    builder.addCase(createFacility.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload as string;
    });

    /** UPDATE **/
    builder.addCase(updateFacility.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFacility.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state.facilities = state.facilities.map((item) => (item.id === action.payload.id ? action.payload : item));

      return state;
    });
    builder.addCase(updateFacility.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload as string;
    });

    /** DELETE **/
    builder.addCase(deleteFacility.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFacility.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state.facilities = state.facilities.filter((item) => item.id !== action.payload.id);

      return state;
    });
    builder.addCase(deleteFacility.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload as string;
    });
  },
});

export default faciltySlice.reducer;
