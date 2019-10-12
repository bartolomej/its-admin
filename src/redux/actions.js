import {
  FETCH_USER_FAILED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_PROFILE_FAILED,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_CATEGORIES_FAILED,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_SUBCATEGORIES_REQUEST,
  FETCH_SUBCATEGORIES_FAILED,
  FETCH_SUBCATEGORIES_SUCCESS,
  FETCH_COURSES_FAILED,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  UPDATE_COURSE_FAILED,
  UPDATE_COURSE_REQUEST,
  UPDATE_COURSE_SUCCESS,
  UPDATE_SUBCATEGORY_REQUEST,
  UPDATE_SUBCATEGORY_SUCCESS,
  UPDATE_SUBCATEGORY_FAILED,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILED,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILED,
  ADD_CATEGORY_REQUEST,
  ADD_SUBCATEGORY_REQUEST,
  ADD_SUBCATEGORY_SUCCESS,
  ADD_SUBCATEGORY_FAILED,
  ADD_COURSE_REQUEST,
  ADD_COURSE_SUCCESS, ADD_COURSE_FAILED, CLEAR_USER_ERROR, CLEAR_EDUCATION_ERROR
} from "./action-types";
import { get, put, post } from "../utils/request";


/** USER ACTIONS **/

export const fetchUsers = dispatch => async () => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const response = await get(`/user`);
    dispatch({ type: FETCH_USER_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_USER_FAILED, payload: e })
  }
};

export const updateUser = dispatch => async (user) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const response = await put(`/user/${user.uid}`, user);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: UPDATE_USER_FAILED, payload: e })
  }
};

export const addUser = dispatch => async (user) => {
  dispatch({ type: ADD_USER_REQUEST });
  try {
    const response = await post(`/user`, user);
    dispatch({ type: ADD_USER_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: ADD_USER_FAILED, payload: e })
  }
};

export const fetchProfile = dispatch => async (uid) => {
  dispatch({ type: FETCH_PROFILE_REQUEST });
  try {
    const response = await get(`/user/${uid}`);
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_PROFILE_FAILED, payload: e })
  }
};

export const clearUserError = dispatch => () => {
  dispatch({ type: CLEAR_USER_ERROR });
};


/** CATEGORY ACTIONS **/

export const fetchCategories = dispatch => async () => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST });
  try {
    const response = await get(`/education/category`);
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_CATEGORIES_FAILED, payload: e })
  }
};

export const updateCategory = dispatch => async (category) => {
  dispatch({ type: UPDATE_CATEGORY_REQUEST });
  const url = `/education/category/${category.uid}`;
  try {
    const response = await put(url, category);
    dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: UPDATE_CATEGORY_FAILED, payload: e })
  }
};

export const addCategory = dispatch => async (category) => {
  dispatch({ type: ADD_CATEGORY_REQUEST });
  try {
    const response = await post(`/education/category`, category);
    dispatch({ type: ADD_CATEGORY_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: ADD_CATEGORY_FAILED, payload: e })
  }
};


/** SUBCATEGORY ACTIONS **/

export const fetchSubcategories = dispatch => async () => {
  dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });
  try {
    const response = await get(`/education/subcategory`);
    dispatch({ type: FETCH_SUBCATEGORIES_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_SUBCATEGORIES_FAILED, payload: e })
  }
};

export const updateSubcategory = dispatch => async (subcategory) => {
  dispatch({ type: UPDATE_SUBCATEGORY_REQUEST });
  const url = `/education/subcategory/${subcategory.uid}`;
  try {
    const response = await put(url, subcategory);
    dispatch({ type: UPDATE_SUBCATEGORY_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: UPDATE_SUBCATEGORY_FAILED, payload: e })
  }
};

export const addSubcategory = dispatch => async (subcategory) => {
  dispatch({ type: ADD_SUBCATEGORY_REQUEST });
  try {
    const response = await post(`/education/subcategory`, subcategory);
    dispatch({ type: ADD_SUBCATEGORY_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: ADD_SUBCATEGORY_FAILED, payload: e })
  }
};


/** COURSE ACTIONS **/

export const fetchCourses = dispatch => async (subcategoryUid) => {
  dispatch({ type: FETCH_COURSES_REQUEST });
  const url = `/education/course${subcategoryUid ? `?subcategory=${subcategoryUid}` : ''}`;
  try {
    const response = await get(url);
    dispatch({ type: FETCH_COURSES_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_COURSES_FAILED, payload: e })
  }
};

export const updateCourse = dispatch => async (course) => {
  dispatch({ type: UPDATE_COURSE_REQUEST });
  const url = `/education/course/${course.uid}`;
  try {
    const response = await put(url, course);
    dispatch({ type: UPDATE_COURSE_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: UPDATE_COURSE_FAILED, payload: e })
  }
};

export const addCourse = dispatch => async (course) => {
  dispatch({ type: ADD_COURSE_REQUEST });
  try {
    const response = await post(`/education/course`, course);
    dispatch({ type: ADD_COURSE_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: ADD_COURSE_FAILED, payload: e })
  }
};

export const clearEducationError = dispatch => () => {
  dispatch({ type: CLEAR_EDUCATION_ERROR });
};