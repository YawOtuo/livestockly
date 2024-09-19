import { Farm } from "@/lib/types/farm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FarmState {
  farm: Farm | null;
}

// Define the initial state
const initialState: FarmState = {
  farm: null, // Initially, the farm is null
};

// Create the slice with typed actions
export const farmSlice = createSlice({
  name: "farm",
  initialState, // Use the defined initialState
  reducers: {
    setFarmDetails: (state, action: PayloadAction<Farm>) => {
      // Update the farm object in the state
      state.farm = action.payload;
    },
  },
});

// Export actions and reducer
export const { setFarmDetails } = farmSlice.actions;
export default farmSlice.reducer;
