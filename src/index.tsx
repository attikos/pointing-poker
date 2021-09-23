import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
// import 'bootstrap/scss/bootstrap.scss';
// import * as bootstrap from 'bootstrap';
// import bootstrap from 'bootstrap/dist/js/bootstrap.esm.js';
import * as bootstrap from 'bootstrap';
import './bootstrap-theme.scss';
import store from './store/store-redux';
import { createBrowserHistory } from 'history';
import { BrowserRouter } from 'react-router-dom';

declare global {
  interface Window {
    api?: any;
    bootstrap: any,
    axios: any,
    websocket: any,
  }
}
const customHistory = createBrowserHistory();

window.bootstrap = bootstrap;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      < BrowserRouter >
        <App history={customHistory} />
      </ BrowserRouter >
    </ Provider >
  </React.StrictMode>,
  document.getElementById('root'),
);
