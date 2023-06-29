import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter'
import messagesReducer from './reducers/messages'

export default configureStore({
  reducer: {
    counter: counterReducer,
    messages: messagesReducer
  },
})