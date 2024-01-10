// reducers.js
const initialState = {
    udata: null,
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_DATA':
        return {
          ...state,
          udata: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  