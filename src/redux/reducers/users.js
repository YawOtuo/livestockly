import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState:{
        isAuthenticated:false
    }, 
    reducers:{
        getUser: (state, action) => {

            state.user = action.payload
        },
        setUserToken: (state, action) =>{
            state.token = action.payload
            
        },
        setUserDetails: (state, action) =>{
            state.user = action.payload
            
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload

        }
    }
})

export const {getUser, setUserToken, 
    setAuthenticated, setUserDetails} = userSlice.actions
export default userSlice.reducer