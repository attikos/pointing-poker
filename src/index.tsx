import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import * as bootstrap from 'bootstrap';
import './bootstrap-theme.scss';
import { BrowserRouter } from 'react-router-dom';
import store from './store/store-redux';
import api from './services/api';
import { websocket, IWebsocket  } from './services/socket';
import { axios } from './services/axios';
import toast from './utils/toastify';

window.bootstrap = bootstrap;
window.axios = axios;
window.api = api;
window.websocket = websocket;
window.toast = toast;

declare global {
  interface Window {
    api: any;
    axios: any;
    websocket: IWebsocket;
    toast: any;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
