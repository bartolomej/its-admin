import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import logger from 'redux-logger'
import initSubscriber from 'redux-subscriber';
import actionWatchReducer from 'redux-action-watch/lib/reducer';
import actionWatchMiddlewareGenerator from 'redux-action-watch/lib/middleware';

import user from './reducers/user';
import event from './reducers/event';
import mail from './reducers/mail';
import profile from './reducers/profile';
import education from './reducers/education';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const actionWatchMiddleware = actionWatchMiddlewareGenerator('watcher');

const store = createStore(
  combineReducers({
    watcher: actionWatchReducer,
    user,
    profile,
    education,
    mail,
    event
  }),
  composeEnhancers(
    applyMiddleware(logger, actionWatchMiddleware)
  )
);

initSubscriber(store);

export default store;