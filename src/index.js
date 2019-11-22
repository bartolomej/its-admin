import React from 'react';
import ReactDOM from 'react-dom';
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from './components/AlertTemplate';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux'
import store from './redux/store';
import * as serviceWorker from './serviceWorker';
import 'rsuite/dist/styles/rsuite-default.css';
import firebase from "firebase/app";
import firebaseconfig from "./firebaseconfig";
import "firebase/auth";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";


const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT
};

const rrfProps = {
  firebase,
  config: {
    userProfile: "users"
  },
  dispatch: store.dispatch
};

firebase.initializeApp(firebaseconfig);

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App/>
      </ReactReduxFirebaseProvider>
    </AlertProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
