import { combineReducers } from "redux";
import user from "./user";
import education from "./education";

export default combineReducers({
  education,
  user
});
