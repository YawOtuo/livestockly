import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState:{
        userData: "",
        userSqlData : ""
    }, 
    reducers:{
       
        setUserSQLDBDetails: (state, action) =>{
            state.userSqlData = action.payload
            
        },
        setUserDetails: (state, action) =>{
            state.userData = action.payload
            
        }
    }
})

export const { setUserDetails, setUserSQLDBDetails} = userSlice.actions
export default userSlice.reducer