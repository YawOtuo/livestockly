import { User } from "@/lib/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userData: any | null;
  userSqlData: User| null; // You might want to replace 'any' with a more specific type if known.
}

const initialState: UserState = {
  userData: null,
  userSqlData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserSQLDBDetails: (state: UserState, action: PayloadAction<User>) => { // Replace 'any' with the correct type if known
      state.userSqlData = action.payload;
    },
    setUserDetails: (state: UserState, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
  },
});

export const { setUserDetails, setUserSQLDBDetails } = userSlice.actions;
export default userSlice.reducer;
