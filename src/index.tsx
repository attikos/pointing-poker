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

window.bootstrap = bootstrap;
window.axios = axios;
window.api = api;
window.websocket = websocket;

declare global {
  interface Window {
    api: any;
    axios: any;
    websocket: IWebsocket;
  }
}
// const customHistory = createBrowserHistory();

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
