export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILED = 'FETCH_USER_FAILED';


export const fetchUsers = dispatch => async () => {
  dispatch({ type: FETCH_USER_REQUEST });
  try {
    let users = await get('/users');
    dispatch({ type: FETCH_USER_SUCCESS, payload: users });
  } catch (e) {
    dispatch({ type: FETCH_USER_FAILED, payload: e })
  }
};

async function get(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(async res => resolve(await res.json))
      .catch(error => reject(error));
  })
}