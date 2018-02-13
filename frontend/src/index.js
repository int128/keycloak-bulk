import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware, ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { middleware as reduxPack } from 'redux-pack'
import reduxPackDispatch from './utils/redux-pack-dispatch'
import reduxLogger from 'redux-logger'
import reducers from './reducers'
import App from './components/App'
import {} from './index.css'

const history = createHistory()

const store = createStore(reducers, applyMiddleware(
  routerMiddleware(history),
  reduxPackDispatch,
  reduxPack,
  reduxLogger))

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
