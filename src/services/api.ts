import { axios, setToken, getToken } from './axios';
import { websocket } from './socket';
import { User, IGame, IIssues, IMembers } from '../interface';
import { TScore, TGameNiceId } from '../types';

window.axios = axios;

const checkGameId = async (gameNiceId : TGameNiceId) => {
  let res;

  try {
    res = await axios.post('/check-game-id', { gameNiceId });
  } catch (error) {
    return;
  }

  const { success, errors } = res.data;

  if (!success) {
    return 'System error. Please, try later';
  }

  if (errors) {
    return errors.gameNiceId;
  }

  return false;
};

interface NewGameApiParams {
  token: any;
  form : User;
  gameNiceId : TGameNiceId;
}

class Form implements User {
  firstName: string;

  lastName: string;

  job: string;

  isObserver: boolean;

  foto: string;

  constructor({ firstName, lastName, job, isObserver, foto } : User) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.job = job;
    this.isObserver = isObserver;
    this.foto = foto;
  }
}

interface NewGameParams {
  user : User,
  gameNiceId: TGameNiceId,
}

/**
 * Create user/game and connect
 * @param {Form} user
 * @returns void
 */
const newGame = async ( { user, gameNiceId }: NewGameParams) => {
  let res;

  const currentToken = getToken();

  const params : NewGameApiParams = {
    token: currentToken,
    form : new Form(user),
    gameNiceId,
  };

  try {
    res = await axios.post('/new-game', params);
  } catch (error) {
    console.log(error);
    return;
  }

  const { token, roomId, success, errors } = res.data;

  if ( errors ) {
    console.log('errors', errors);
    return errors;
  }

  if (success && token && roomId) {
    console.log('token', token);
    console.log('roomId', roomId);

    setToken(token);
    websocket.setRoomId(roomId);
    // websocket.connect()

    return true;
  } else {
    throw Error('System error: wrong token or roomId');
  }
};

/**
 * Get all game data (without current player profile)
 */
const fetchAllData = ():void => {
  websocket.emit('getAllData');
};


/**
 * Get current player profile
 */
const fetchUser = ():void => {
  websocket.emit('getGetUser');
};

/**
 * Change game status from 'lobby' to 'game'
 */
const startGame = ():void => {
  websocket.emit('startGame');
};

/**
 * For diller: Change game status from 'game' to 'result'
 * For player: exit from game
 */
const cancelGame = ():void => {
  websocket.emit('cancelGame');
};

/**
 * ??? use setIssueAsCurrent instead
 */
const startRound = ():void => {
  websocket.emit('startRound');
};

const setIssueAsCurrent = (issueId: string):void => {
  websocket.emit('setIssueAsCurrent', issueId);
};

const deleteUser = (niceId:TGameNiceId):void => {
  websocket.emit('deleteUser', niceId);
};

/**
 * Add or update score
 * @param {Object} issue
 */
const addScore = (score: TScore):void => {
  websocket.emit('addScore', score);
};

/**
 * Add or update issue
 * @param {Object} issue
 */
const addIssue = (issue: IIssues):void => {
  websocket.emit('addIssue', issue);
};

const deleteIssue = (issueId: string):void => {
  websocket.emit('addIssue', issueId);
};

const exportData = {
  checkGameId,
  newGame,
  startGame,
  cancelGame,
  startRound,
  deleteUser,
  fetchAllData,
  fetchUser,
  setIssueAsCurrent,
  addIssue,
  addScore,
  deleteIssue,
};

window.api = exportData;
window.websocket = websocket;

export default exportData;
