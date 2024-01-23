import { createSlice } from '@reduxjs/toolkit'

export const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    message: ""
  },
  reducers: {
    addMessage: (state, action) => {

      state.message = action.payload
    },

  },
})

// Action creators are generated for each case reducer function
export const { addMessage } = messagesSlice.actions

export default messagesSlice.reducer