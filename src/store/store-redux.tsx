import { combineReducers, createStore } from 'redux';
import gameReducer from './game-redux';
import allDataReducer from './all-data-redux';
import issuesReducer from './issues-redux';
import membersReducer from './members-redux';
import updatePlayerOrMasterReducer from './playerOrMaster-redux';
import popapLobbyReducer from './popapLobby-redux';

const reducers = combineReducers({
  allData: allDataReducer,
  userData: popapLobbyReducer,
  playerOrMaster: updatePlayerOrMasterReducer,
  game: gameReducer,
  members: membersReducer,
  issues: issuesReducer,
  // scores: scoresReducer,
});
const store = createStore(reducers);
export default store;
