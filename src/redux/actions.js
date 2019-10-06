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
  FETCH_COURSES_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_ADMIN_REQUEST, UPDATE_ADMIN_SUCCESS, UPDATE_ADMIN_FAILED
} from "./action-types";


const host = 'http://localhost:3000';

export const fetchUsers = dispatch => async () => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    const response = await getData(`/user`);
    dispatch({ type: FETCH_USER_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_USER_FAILED, payload: e })
  }
};

export const updateUser = dispatch => async (user) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const response = await putData(`/user/${user.uid}`, user);
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: UPDATE_USER_FAILED, payload: e })
  }
};

export const fetchProfile = dispatch => async (uid) => {
  dispatch({ type: FETCH_PROFILE_REQUEST });
  try {
    const response = await getData(`/admin/${uid}`);
    dispatch({ type: FETCH_PROFILE_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_PROFILE_FAILED, payload: e })
  }
};

export const fetchAdmins = dispatch => async () => {
  dispatch({ type: FETCH_ADMINS_REQUEST });
  try {
    const response = await getData(`/admin`);
    dispatch({ type: FETCH_ADMINS_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_ADMINS_FAILED, payload: e })
  }
};

export const updateAdmin = dispatch => async (admin) => {
  dispatch({ type: UPDATE_ADMIN_REQUEST });
  try {
    const response = await putData(`/admin/${admin.uid}`, admin);
    dispatch({ type: UPDATE_ADMIN_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: UPDATE_ADMIN_FAILED, payload: e })
  }
};

export const fetchCategories = dispatch => async () => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST });
  try {
    const response = await getData(`/education/category`);
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_CATEGORIES_FAILED, payload: e })
  }
};

export const fetchSubcategories = dispatch => async () => {
  dispatch({ type: FETCH_SUBCATEGORIES_REQUEST });
  try {
    const response = await getData(`/education/subcategory`);
    dispatch({ type: FETCH_SUBCATEGORIES_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_SUBCATEGORIES_FAILED, payload: e })
  }
};

export const fetchCourses = dispatch => async (subcategoryUid) => {
  dispatch({ type: FETCH_COURSES_REQUEST });
  const url = `/education/course${subcategoryUid ? `?subcategory=${subcategoryUid}` : ''}`;
  try {
    const response = await getData(url);
    dispatch({ type: FETCH_COURSES_SUCCESS, payload: response })
  } catch (e) {
    dispatch({ type: FETCH_COURSES_FAILED, payload: e })
  }
};

async function putData(url = '', data = {}) {
  const response = await fetch(host + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

async function postData(url = '', data = {}) {
  const response = await fetch(host + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

async function getData(url) {
  const response = await fetch(host + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  return await response.json();
}