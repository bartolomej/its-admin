import {
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_COURSES_FAILED,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILED,
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS,
  UPDATE_CATEGORY_FAILED,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_COURSE_FAILED,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_SUBCATEGORY_FAILED,
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_SUCCESS
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
    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.map(c => (
          c.uid === action.payload.uid ? action.payload : c
        ))
      };
    case UPDATE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_SUBCATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UPDATE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: state.subcategories.map(s => (
          s.uid === action.payload.uid ? action.payload : s
        ))
      };
    case UPDATE_SUBCATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_COURSE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case UPDATE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: state.courses.map(c => (
          c.uid === action.payload.uid ? action.payload : c
        ))
      };
    case UPDATE_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default: return state;
  }
}