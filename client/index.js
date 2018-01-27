import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from '../client/store'

ReactDOM.render(
  <Provider store={store}>
    <h1>hello world</h1>
  </Provider>,
  document.getElementById('app')
)