import { axios, setToken, getToken } from './axios';
import { websocket } from './socket';
import { User, TGameNiceId } from '../interface';

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

  constructor({
    firstName, lastName, job, isObserver, foto,
  } : User) {
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
const newGame = async ({ user, gameNiceId }: NewGameParams) => {
  let res;

  const currentToken = getToken();

  const params : NewGameApiParams = {
    token: currentToken,
    form: new Form(user),
    gameNiceId,
  };

  try {
    res = await axios.post('/new-game', params);
  } catch (error) {
    console.log(error);
    return;
  }

  const {
    token, roomId, success, errors,
  } = res.data;

  if (errors) {
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
  }

  throw Error('System error: wrong token or roomId');
};

const exportData = {
  checkGameId,
  newGame,
};

window.api = exportData;
window.websocket = websocket;

export default exportData;
