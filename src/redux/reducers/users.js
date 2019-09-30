import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
} from '../actions';

const initialState = {
  loading: false,
  error: null,
  courses: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default: return state;
  }
}