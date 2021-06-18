import { createSlice } from "@reduxjs/toolkit";

export const sliceOfCurrentPage = createSlice({
  name: "slice_current_page",
  initialState: 0,
  reducers: {
    setCurrent(state, action) {
      return action.payload;
    }
  }
});

export const { setCurrent } = sliceOfCurrentPage.actions;