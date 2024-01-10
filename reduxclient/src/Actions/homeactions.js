// actions.js
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const deleteUserData = (id) => ({
  type: DELETE_USER_SUCCESS,
  payload: id,
});
