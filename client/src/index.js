import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import './assets/css/nucleo-icons.css';
// import './assets/scss/blk-design-system-react.scss?v=1.0.0';
// import './assets/demo/demo.css';
// import './assets/scss/black-dashboard-pro-react.scss';
// import './assets/scss/black-dashboard-pro-react.scss';
// import './assets/css/black-dashboard-pro-react.css';

import * as serviceWorker from './serviceWorker';
import App from './App';
import userReducer from './store/reducers/user';
import geoReducer from './store/reducers/geo';

const logger = createLogger();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
  auth: userReducer,
  geo: geoReducer
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)));

// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
