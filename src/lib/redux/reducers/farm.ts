import { createSlice } from "@reduxjs/toolkit";

export const farmSlice = createSlice({
  name: "farm",
  initialState: {
    details: "",
  },
  reducers: {
    setFarmDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const { setFarmDetails } = farmSlice.actions;
export default farmSlice.reducer;
