import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'

const reducers = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: usersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk))
)

export default store