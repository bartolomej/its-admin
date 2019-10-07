import {
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED, ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAILED,
} from '../action-types';

const initialState = {
  loading: false,
  error: null,
  users: [],
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
        users: action.payload
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(user => (
          user.uid === action.payload.uid
            ? action.payload : user
        ))
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case ADD_USER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload]
      };
    case ADD_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default: return state;
  }
}