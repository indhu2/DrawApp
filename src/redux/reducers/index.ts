import {combineReducers} from 'redux';
import home from "./home";

// Combine the Reducers
const appReducer = combineReducers({
  home: home,
});

// Define Root Reducer
const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

export default rootReducer;
