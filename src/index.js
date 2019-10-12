import React from 'react';
import ReactDOM from 'react-dom';
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from './components/AlertTemplate';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from './redux/store';
import * as serviceWorker from './serviceWorker';

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
