import { combineReducers, createStore } from 'redux'
import updatePlayerOrMasterReducer from './playerOrMaster-redux'
import popapLobbyReducer from './popapLobby-redux'

let reducers = combineReducers({
   formData: popapLobbyReducer,
   playerOrMaster: updatePlayerOrMasterReducer,
   
})
let store = createStore(reducers);
export type RootState = ReturnType<typeof store.getState>;

export default store
