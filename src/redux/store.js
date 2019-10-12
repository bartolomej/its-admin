import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import logger from 'redux-logger'
import initSubscriber from 'redux-subscriber';


const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

initSubscriber(store);

export default store;