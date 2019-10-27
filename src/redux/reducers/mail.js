import {
  FETCH_EMAILS_FAILED,
  FETCH_EMAILS_REQUEST,
  FETCH_EMAILS_SUCCESS
} from "../action-types";


const initialState = {
  loading: false,
  error: null,
  emails: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_EMAILS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_EMAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        emails: action.payload
      };
    case FETCH_EMAILS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}