import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import users from './users'
import importUsers from './importUsers'
import importUsersText from './importUsersText'
import signIn from './signIn'
import signInRequest from './signInRequest'

export default combineReducers({
  users,
  importUsers,
  importUsersText,
  signIn,
  signInRequest,
  router: routerReducer,
})
