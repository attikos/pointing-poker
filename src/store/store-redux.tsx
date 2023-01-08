import { combineReducers, createStore } from 'redux';
import allDataReducer from './all-data-redux';
import userReducer from './user-redux';

const reducers = combineReducers({
  allData: allDataReducer,
  userData: userReducer,
});
const store = createStore(reducers);
export type RootState = ReturnType<typeof store.getState>;

export default store;
