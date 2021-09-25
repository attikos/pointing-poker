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
import { BrowserRouter } from 'react-router-dom';
import store from './store/store-redux';

window.bootstrap = bootstrap;

declare global {
  interface Window {
    api: any;
    axios: any;
    websocket: any;
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
