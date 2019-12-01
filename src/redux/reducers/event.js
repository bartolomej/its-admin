import {
  FETCH_EVENTS_FAILED,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS
} from "../action-types";


const initialState = {
  loading: false,
  error: null,
  events: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_EVENTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload
      };
    case FETCH_EVENTS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}