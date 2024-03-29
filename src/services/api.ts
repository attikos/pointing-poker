import { ICreateIssue, ICreateUser, IIssue } from '../interface';
import { TNiceId, TScore } from '../types';
import { axios, getToken, setToken } from './axios';
import { websocket } from './socket';

const checkGameId = async (gameNiceId: TNiceId): Promise<string | boolean> => {
  const DEFAULT_ERROR = 'Wrong game ID';
  const SYSTEM_ERROR = 'System error. Please, try later';
  let res;

  try {
    res = await axios.post('/check-game-id', { gameNiceId });
  } catch (error) {
    return DEFAULT_ERROR;
  }

  const { success, errors } = res.data;

  if (!success) {
    return SYSTEM_ERROR;
  }

  if (errors) {
    return errors.gameNiceId;
  }

  return false;
};

interface NewGameApiParams {
  token: string;
  form: ICreateUser;
  gameNiceId: TNiceId;
}

class Form implements ICreateUser {
  firstName: string;

  lastName: string;

  job: string;

  isObserver: boolean;

  foto: string | undefined;

  constructor({
    firstName,
    lastName,
    job,
    isObserver,
    foto,
  }: ICreateUser) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.job = job;
    this.isObserver = isObserver;
    this.foto = foto;
  }
}

export interface NewGameParams {
  user: ICreateUser;
  gameNiceId: TNiceId;
}

/**
 * Restore session
 * @returns void
 */
const restoreSession = async (): Promise<boolean> => {
  let res;

  const gameNiceId = location.pathname.slice(1);
  const currentToken = getToken();

  const params = {
    token: currentToken,
    gameNiceId,
  };

  try {
    res = await axios.post('/restore-session', params);
  } catch (error) {
    console.log(error);
    return false;
  }

  const { token, roomId, success, errors } = res.data;

  if ( errors ) {
    return errors;
  }

  if (success && token && roomId) {
    setToken(token);
    websocket.setRoomId(roomId);

    return true; // already for connect to WS
  } else {
    throw Error('System error: wrong token or roomId');
  }
};

/**
 * Create user/game and connect
 * @param {Form} user
 * @returns void
 */
const newGame = async ({
  user,
  gameNiceId,
}: NewGameParams): Promise<string | boolean> => {
  let res;

  const currentToken = getToken();

  const params: NewGameApiParams = {
    token: currentToken,
    form: new Form(user),
    gameNiceId,
  };

  try {
    res = await axios.post('/new-game', params);
  } catch (error) {
    console.log(error);
    return false;
  }

  const { token, roomId, success, errors } = res.data;

  if (errors) {
    return errors;
  }

  if (success && token && roomId) {
    setToken(token);
    websocket.setRoomId(roomId);

    return true; // already for connect to WS
  } else {
    throw Error('System error: wrong token or roomId');
  }
};
/**
 * Diller as player or not
 */
const setAsObserver = (flag: boolean): void =>{
  const dataFlag = flag === undefined ? true : flag;

  websocket.emit('setAsObserver', dataFlag);
};

const sendMessage = (message: string): void =>{
  if ( !message ) {
    return;
  }

  websocket.emit('sendMessage', message);
};
/**
 * Get all game data (without current player profile)
 */
const fetchAllData = (): void => {
  websocket.emit('getAllData');
};

/**
 * Get current player profile
 */
const fetchUser = (): void => {
  websocket.emit('getUser');
};

/**
 * Change game status from 'lobby' to 'game'
 */
const startGame = (): void => {
  websocket.emit('startGame');
};

/**
 * Run after kick a current player
 */
const userKicked = ():void => {
  websocket.close();
};

/**
 * For diller and player: exit from game
 */
const leaveGame = ():void => {
  try {
    websocket.emit('leaveGame');
  } catch (error) {
    websocket.close();
    console.error('error', error);
  }
};

/**
 * For diller: Change game status from 'game' to 'result'
 */
const stopGame = ():void => {
  websocket.emit('stopGame');
};

/**
 * Set status IIssue fopm 'new' to 'processing'
 */
const startRound = (): void => {
  websocket.emit('startRound');
};

/**
 * Set status IIssue fopm 'processing' to 'finished' OR 'new'
 */
const stopRound = (): void => {
  websocket.emit('stopRound');
};

const setIssueAsCurrent = (issueId: number, flag?: boolean | undefined):void => {
  websocket.emit('setIssueAsCurrent', { issueId, flag });
};

const deleteUser = (niceId: TNiceId): void => {
  websocket.emit('deleteUser', niceId);
};

/**
 * Add or update score for current issue.
 * @param {Object} issue
 */
const addScore = (score: TScore): void => {
  websocket.emit('addScore', score);
};

/**
 * Add or update issue
 * @param {Object} issue
 */
const addIssue = (issue: IIssue | ICreateIssue): void => {
  websocket.emit('addIssue', issue);
};

const deleteIssue = (issueId: number): void => {
  websocket.emit('deleteIssue', issueId);
};

const exportData = {
  restoreSession,
  checkGameId,
  newGame,
  startGame,
  userKicked,
  leaveGame,
  stopGame,
  startRound,
  stopRound,
  deleteUser,
  fetchAllData,
  fetchUser,
  setIssueAsCurrent,
  addIssue,
  addScore,
  deleteIssue,
  setAsObserver,
  sendMessage,
};

export default exportData;
