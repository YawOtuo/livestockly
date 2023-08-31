import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState:{

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
            
        }
    }
})

export const {getUser, setUserToken, setUserDetails} = userSlice.actions
export default userSlice.reducer