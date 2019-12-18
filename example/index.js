import ReactDom from 'react-dom'
import React from 'react';
import App from './src/app'
import { Provider } from 'react-redux'
import store from './store';

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)