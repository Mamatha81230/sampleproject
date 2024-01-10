// reducers.js
import { FETCH_DATA_SUCCESS, DELETE_USER_SUCCESS } from '../Actions/homeactions';

const initialState = {
  userData: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        userData: state.userData.filter(user => user._id !== action.payload),
      };
    default:
      return state;
  }
};

export default rootReducer;
