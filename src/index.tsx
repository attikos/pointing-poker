import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
import store from './store/store-redux';
import { BrowserRouter } from "react-router-dom";

// declare global {
//   interface Window {
//     api?: any;
//     bootstrap: bootstrap,
//   }
// }

window.bootstrap = bootstrap;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      < BrowserRouter>
        <App />
      </ BrowserRouter >
    </ Provider >
  </React.StrictMode>,
  document.getElementById('root')
);
