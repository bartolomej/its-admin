import {
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_FAILED,
  FETCH_ADMINS_SUCCESS,
  FETCH_ADMINS_REQUEST,
  FETCH_ADMINS_FAILED,
  UPDATE_ADMIN_REQUEST,
  UPDATE_ADMIN_SUCCESS,
  UPDATE_ADMIN_FAILED
} from "../action-types";

const initialState = {
  loading: false,
  error: null,
  profile: null,
  admins: []
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
        profile: action.payload
      };
    case FETCH_PROFILE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case FETCH_ADMINS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_ADMINS_SUCCESS:
      return {
        ...state,
        loading: false,
        admins: action.payload
      };
    case FETCH_ADMINS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_ADMIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_ADMIN_SUCCESS:
      return {
        ...state,
        admins: state.admins.map(admin => (
          admin.uid === action.payload.uid
            ? action.payload : admin
        ))
      };
    case UPDATE_ADMIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default: return state;
  }
}