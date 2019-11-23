import {
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_FAILED
} from "../action-types";


const initialState = {
  loading: false,
  error: null,
  authToken: null,
  user: null
};

export default function (state = initialState, action) {
  switch (action.type) {
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
    default: return state;
  }
}