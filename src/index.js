import React from 'react';
import ReactDOM from 'react-dom';
import './Assets/css/index.css';
import App from './App';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './Constants/store.js'

ReactDOM.render(
  <Provider store={store} >
    <Router>
        <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
