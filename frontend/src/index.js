import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { middleware as reduxPack } from 'redux-pack'
import reduxPackDispatch from './utils/redux-pack-dispatch'
import reduxLogger from 'redux-logger'
import reducers from './reducers'
import * as actionCreators from './actions/creators'
import App from './components/App'
import {} from './index.css'

const store = createStore(reducers,
  applyMiddleware(reduxPackDispatch, reduxPack, reduxLogger))

if (window.location.search) {
  store.dispatch(actionCreators.createSession())
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
