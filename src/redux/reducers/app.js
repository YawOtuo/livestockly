import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState:{
        refresh: 0,
        loading:false, 
    }, 
    reducers:{
        refresh: (state, action) => {

            state.refresh +=1
        },
        toggleLoading: (state, action) => {

            state.loading = !state.loading
        },
        
    }
})

export const {refresh} = appSlice.actions
export default appSlice.reducer