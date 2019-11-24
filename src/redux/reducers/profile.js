import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED,
  AUTH_ADMIN_REQUEST,
  AUTH_ADMIN_SUCCESS,
  AUTH_ADMIN_FAILED
} from "../action-types";


const initialState = {
  loading: false,
  error: null,
  loggedIn: false,
  user: null
};

export default function (state = initialState, action) {
  switch (action.type) {

    /** ADMIN AUTHORIZATION **/
    case AUTH_ADMIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case AUTH_ADMIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true
      };
    case AUTH_ADMIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    /** PROFILE FETCH **/
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case FETCH_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}