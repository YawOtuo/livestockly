import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/counter'
import messagesReducer from './reducers/messages'
import usersReducer from './reducers/users'
import appReducer from './reducers/app'
import farmReducer from './reducers/farm'


export default configureStore({
  reducer: {
    counter: counterReducer,
    messages: messagesReducer,
    users: usersReducer,
    app: appReducer,
    farm : farmReducer
  },

})