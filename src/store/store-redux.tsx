import { combineReducers, createStore } from 'redux';
import allDataReducer from './all-data-redux';
import popapLobbyReducer from './user-redux';

const reducers = combineReducers({
  allData: allDataReducer,
  userData: popapLobbyReducer,
});
const store = createStore(reducers);
export default store;
