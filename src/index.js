import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/app.js'

const API_KEY = "ee389fb3b8a718bad176903e8ebe8942";

ReactDOM.render(<App apiKey={API_KEY}/>, document.querySelector('.container'));
