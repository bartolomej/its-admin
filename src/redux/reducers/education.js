import {
  ADD_CATEGORY_FAILED,
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  ADD_COURSE_FAILED,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS,
  ADD_SUBCATEGORY_FAILED,
  ADD_SUBCATEGORY_REQUEST,
  ADD_SUBCATEGORY_SUCCESS,
  CLEAR_EDUCATION_ERROR,
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_COURSES_FAILED,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_SUBCATEGORIES_FAILED,
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_SUCCESS,
  REMOVE_CATEGORY_FAILED,
  REMOVE_CATEGORY_REQUEST,
  REMOVE_CATEGORY_SUCCESS,
  REMOVE_COURSE_FAILED,
  REMOVE_COURSE_REQUEST,
  REMOVE_COURSE_SUCCESS, REMOVE_SUBCATEGORY_FAILED,
  REMOVE_SUBCATEGORY_REQUEST, REMOVE_SUBCATEGORY_SUCCESS,
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

    /** CATEGORY REDUCERS **/
    case CLEAR_EDUCATION_ERROR:
      return {
        ...state,
        error: null
      };
    case REMOVE_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case REMOVE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter(c => c.uid !== action.payload)
      };
    case REMOVE_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
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
    case ADD_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: [ ...state.categories, action.payload ]
      };
    case ADD_CATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    /** SUBCATEGORY REDUCERS **/
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
    case ADD_SUBCATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADD_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: [ ...state.subcategories, action.payload ]
      };
    case ADD_SUBCATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case REMOVE_SUBCATEGORY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case REMOVE_SUBCATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subcategories: state.subcategories.filter(c => c.uid !== action.payload)
      };
    case REMOVE_SUBCATEGORY_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    /** COURSE REDUCERS **/
    case FETCH_COURSES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: action.payload
      };
    case FETCH_COURSES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case REMOVE_COURSE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case REMOVE_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: state.courses.filter(c => c.uid !== action.payload)
      };
    case REMOVE_COURSE_FAILED:
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
    case ADD_COURSE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ADD_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
        courses: [ ...state.courses, action.payload ]
      };
    case ADD_COURSE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
}