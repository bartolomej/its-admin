import {
  FETCH_USER_FAILED,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_ADMINS_FAILED,
  FETCH_ADMINS_REQUEST,
  FETCH_ADMINS_SUCCESS,
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
  FETCH_COURSES_SUCCESS
} from "./action-types";


export const fetchUsers = dispatch => async () => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    let users = await get('/user');
    dispatch({ type: FETCH_USER_SUCCESS, payload: users });
  } catch (e) {
    dispatch({ type: FETCH_USER_FAILED, payload: e })
  }
};

export const fetchProfile = dispatch => async (uid) => {
  dispatch({ type: FETCH_PROFILE_REQUEST });
  try {
    let profile = await get(`/admin/${uid}`);
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: profile });
  } catch (e) {
    dispatch({ type: FETCH_PROFILE_FAILED, payload: e })
  }
};

export const fetchAdmins = dispatch => async () => {
  dispatch({ type: FETCH_ADMINS_REQUEST });
  try {
    let admins = await get('/admin');
    dispatch({ type: FETCH_ADMINS_SUCCESS, payload: admins });
  } catch (e) {
    dispatch({ type: FETCH_ADMINS_FAILED, payload: e })
  }
};

export const fetchCategories = dispatch => async () => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST });
  try {
    let categories = await get('/education/category');
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: categories });
  } catch (e) {
    dispatch({ type: FETCH_CATEGORIES_FAILED, payload: e })
  }
};

export const fetchSubcategories = dispatch => async () => {
  dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });
  try {
    let subcategories = await get(`/education/subcategory`);
    dispatch({ type: FETCH_SUBCATEGORIES_SUCCESS, payload: subcategories });
  } catch (e) {
    dispatch({ type: FETCH_SUBCATEGORIES_FAILED, payload: e })
  }
};

export const fetchCourses = dispatch => async (subcategoryUid) => {
  dispatch({ type: FETCH_COURSES_REQUEST });
  try {
    let courses = await get(
      `/education/course${subcategoryUid ? `?subcategory=${subcategoryUid}` : ''}`
    );
    dispatch({ type: FETCH_COURSES_SUCCESS, payload: courses });
  } catch (e) {
    dispatch({ type: FETCH_COURSES_FAILED, payload: e })
  }
};



async function get(url) {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000' + url)
      .then(res => res.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  })
}