import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';

// declare global {
//   interface Window {
//     api?: any;
//     bootstrap: bootstrap,
//   }
// }

window.bootstrap = bootstrap;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
