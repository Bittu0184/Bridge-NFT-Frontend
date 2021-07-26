import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import { Auth0Provider } from "@auth0/auth0-react";
import configData from './Config.json';

ReactDOM.render(
  <Auth0Provider
    domain={configData.domain}
    clientId={configData.clientId}
    redirectUri={configData.redirectUri}
    audience={configData.audience}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
