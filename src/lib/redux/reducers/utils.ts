import { createSlice } from "@reduxjs/toolkit";

export const utilsSlice = createSlice({
  name: "utils",
  initialState: {
    editOrAdd: "",
  },
  reducers: {
    setEditOrAdd: (state, action) => {
      state.editOrAdd = action.payload;
    },
  },
});

export const { setEditOrAdd } = utilsSlice.actions;
export default utilsSlice.reducer;
