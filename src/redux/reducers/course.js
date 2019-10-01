import {
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_COURSES_FAILED,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILED,
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS
} from "../action-types";


const initialState = {
  loading: false,
  error: null,
  categories: [],
  subcategories: [],
  courses: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload
      };
    case FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case FETCH_SUBCATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: action.payload
      };
    case FETCH_SUBCATEGORIES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case FETCH_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        loading: true,
        courses: action.payload
      };
    case FETCH_COURSES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default: return state;
  }
}