import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from 'redux-logger'
import initSubscriber from 'redux-subscriber';
import actionWatchReducer from 'redux-action-watch/lib/reducer';
import actionWatchMiddlewareGenerator from 'redux-action-watch/lib/middleware';

import user from './reducers/user';
import mail from './reducers/mail';
import education from './reducers/education';


const actionWatchMiddleware = actionWatchMiddlewareGenerator('watcher');

const store = createStore(
  combineReducers({
    watcher: actionWatchReducer,
    user,
    education,
    mail
  }),
  applyMiddleware(logger, actionWatchMiddleware)
);

initSubscriber(store);

export default store;