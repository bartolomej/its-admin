import { combineReducers } from "redux";
import user from "./user";
import course from "./course";
import admin from './admin';

export default combineReducers({
  course,
  user,
  admin
});
