import { combineReducers } from 'redux'
import users from './users'
import tabs from './tabs'
import importUsers from './importUsers'
import importUsersText from './importUsersText'

export default combineReducers({
  users,
  tabs,
  importUsers,
  importUsersText,
})
