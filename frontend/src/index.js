import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { middleware as reduxPack } from 'redux-pack'
import reduxLogger from 'redux-logger'
import reducers from './reducers'
import App from './components/App'
import {} from './index.css'

const reduxPackDispatch = ({ dispatch }) => next => action => {
  if ((typeof action.promise === 'function') && (typeof action.promise.then === 'undefined')) {
    return next({...action, promise: action.promise(dispatch)});
  }
  return next(action);
}

const store = createStore(reducers,
  applyMiddleware(reduxPackDispatch, reduxPack, reduxLogger))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
