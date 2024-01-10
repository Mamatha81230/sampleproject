// store.js
import { createStore, combineReducers } from 'redux';
import registerReducer from './Reducers/registerReducers';
import homeReducer from './Reducers/homeReducers';

const rootReducer = combineReducers({
  register: registerReducer,
  home: homeReducer,
});

const initialState = {
  userData: [],
};
const store = createStore(rootReducer);

export default store;
