import { combineReducers, createStore } from 'redux'
import gameReducer from './game-redux'
import issuesReducer from './issues-redux'
import membersReducer from './members-redux'
import updatePlayerOrMasterReducer from './playerOrMaster-redux'
import popapLobbyReducer from './popapLobby-redux'

let reducers = combineReducers({
   userData: popapLobbyReducer,
   playerOrMaster: updatePlayerOrMasterReducer,
   game: gameReducer,
   members: membersReducer,
   issues: issuesReducer,
   // scores: scoresReducer,
})
let store = createStore(reducers)
export default store
