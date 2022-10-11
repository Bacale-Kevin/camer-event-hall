import { Category } from "@prisma/client";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { API } from "./../../../../utils/baseUrl";

/***** CREATE  CATEGORY ******/
export const createCategory = createAsyncThunk(
  `/api/categories/create`,
  async (name: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await API.post(`/api/categories`, { name });

      return fulfillWithValue(data);
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

/***** GET ALL CATEGORIES ******/
export const getCategories = createAsyncThunk(`/api/categories`, async (_, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/api/categories`);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

/***** GET SINGLE EVENT TYPE ******/
export const getCategory = createAsyncThunk(`/api/categories/getOne`, async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await API.get(`/api/categories/${id}`);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

/***** DELETE EVENT TYPE ******/
export const deleteCategory = createAsyncThunk(`DELETE EVENT CATEGORY`, async (id: string, { rejectWithValue }) => {
  try {
    const { data } = await API.delete(`/api/categories/${id}`);

    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

/***** UPDATE EVENT TYPE ******/
export const updateCategory = createAsyncThunk(
  `UPDATE EVENT CATEGORY`,
  async (values: Category, { rejectWithValue }) => {
    try {
      const { id, name } = values;
      const { data } = await API.put(`/api/categories/${id}`, { name });

      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
