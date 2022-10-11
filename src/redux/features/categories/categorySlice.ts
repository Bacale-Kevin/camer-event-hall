import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createCategory, deleteCategory, getCategory, updateCategory, getCategories } from "./categoriesActions";
import { ICategory } from "./../../../types/category.types";

const initialState: ICategory = {
  loading: false,
  categories: [],
  category: null,
  isError: false,
  isSuccess: false,
  errorMessage: "",
  successMessage: "",
};

const categorySlice = createSlice({
  name: "venuetypes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state.categories = action.payload;
      state.errorMessage = "";

      return state;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.categories = [];
      state.errorMessage = action.payload as string;
    });

    /** CREATE **/
    builder.addCase(createCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createCategory.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.isSuccess = true;
      state.isError = false;
      state?.categories?.push(action.payload.createdCategory);
      state.successMessage = action.payload.message;

      return state;
    });
    builder.addCase(createCategory.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.isSuccess = false;
      state.errorMessage = action.payload as string;
    });

    /** UPDATE **/
    // builder.addCase(updateEventType.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(updateEventType.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.isSuccess = true;
    //   state.isError = false;
    //   state.categories = state.categories.map((item) => (item.id === action.payload.id ? action.payload : item));

    //   return state;
    // });
    // builder.addCase(updateEventType.rejected, (state, action) => {
    //   state.loading = false;
    //   state.isError = true;
    //   state.isSuccess = false;
    //   state.errorMessage = action.payload as string;
    // });

    /** DELETE **/
    // builder.addCase(deleteEventType.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(deleteEventType.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.isSuccess = true;
    //   state.isError = false;
    //   state.categories = state.categories.filter((item) => item.id !== action.payload.id);

    //   return state;
    // });
    // builder.addCase(deleteEventType.rejected, (state, action) => {
    //   state.loading = false;
    //   state.isError = true;
    //   state.isSuccess = false;
    //   state.errorMessage = action.payload as string;
    // });
  },
});

export default categorySlice.reducer;
