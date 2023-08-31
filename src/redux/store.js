import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter'
import messagesReducer from './reducers/messages'
import usersReducer from './reducers/users'

export default configureStore({
  reducer: {
    counter: counterReducer,
    messages: messagesReducer,
    users: usersReducer
  },
})