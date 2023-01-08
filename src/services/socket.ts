import Ws from '@adonisjs/websocket-client';
import { IUser } from '../interface';
import { getToken } from './axios';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const env = require(`../env/${ process.env.NODE_ENV }.env`);

interface ISubscription {
  emit: (arg:string, arg1?:any) => void
  on: (arg:string, arg1:(data:any) => any) => void
  state: string
}

export interface IWebsocket {
  callbackList: { [key: string]: () => void };
  ws: null | {
    emit: (arg:string, arg1?:any) => void
    on: (arg:string, arg1:() => void) => void
    subscribe: (arg:string) => ISubscription
    close: () => void
  };
  subscription: null | ISubscription;
  roomId: string;
  connect: () => Promise<void>;
  subscribe: () => Promise<void | boolean | IUser>;
  on: (arg:string, arg1:() => void) => void;
  off: (arg:string) => void;
  setRoomId: (arg:string) => void;
  setCallback: (arg:string, arg1?:() => void) => void;
  emit: (arg:string, arg1?:any) => void
  runCallback: (arg:string) => void;
  close: () => void;
}

export const websocket: IWebsocket = {
  callbackList : {},

  ws : null,

  subscription : null,

  roomId: '',

  setRoomId(roomId) {
    this.roomId = roomId;
  },

  /**
   * Connect and sunscribe to chat
   * Events: close, open, error
   */
  async connect() {
    if ( this.ws ) {
      this.close();

      return new Promise( resolve => {
        setTimeout( async () => {
          await this.connect();
          resolve();
        }, 300);
      });
    }

    // eslint-disable-next-line no-async-promise-executor
    return new Promise( async (resolve, reject) => {
      if (!this.roomId) {
        return;
      }

      try {
        const token = getToken();
        this.ws = this.ws || await Ws(env.API_URL_WEBSOCKET)
          .withApiToken( token )
          .connect();

        this.ws?.on('close', () => {
          this.close();
          this.runCallback('close');
        });

        this.ws?.on('open', async () => {
          this.runCallback('open');

          await this.subscribe();
          resolve();
        });

        this.ws?.on('error', () => {
          this.runCallback('error');
          reject();
        });
      } catch (err) {
        console.log(err);
      }
    });
  },

  emit(event, payload) {
    if ( this.subscription?.state === 'closed' ) {
      return this.close();
    }

    this.subscription?.emit(event, payload);
  },

  close() {
    this.ws?.close();
    this.ws = null;
    this.subscription = null;
  },

  /**
     * Subscribe to the chat.
     * Events: ready, error, close, all-data, viewed
     *
     * @return {Promise}
     */
  async subscribe() {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise( async (resolve, reject) => {
      if (!this.ws) {
        throw new Error('Websocket not connected. Subscription not available.');
      }

      if (!this.roomId) {
        return;
      }

      try {
        this.subscription = await this.ws?.subscribe(`room:${ this.roomId }`);
      } catch (err) {
        console.log(err);
      }

      this.subscription?.on('ready', () => {
        resolve(true);
      });

      this.subscription?.on('all-data', (data) => {
        resolve(data);
      });

      this.subscription?.on('user', (data) => {
        resolve(data);
      });

      this.subscription?.on('error', (e) => {
        reject(e);
      });

      this.subscription?.on('close', (e) => {
        this.close();
        reject(e);
      });
    });
  },

  on(eventName, handler) {
    if (!this.ws) {
      return;
    }

    this.setCallback(eventName, handler);
  },

  off(eventName:string) {
    if (!this.ws) {
      return;
    }

    this.setCallback(eventName);
  },

  runCallback(eventName) {
    this.callbackList[ eventName ]?.();
  },

  setCallback(eventName, handler) {
    if (handler) {
      this.callbackList[ eventName ] = handler;

      if (eventName === 'open' && this.ws) {

        /**
         * Event open already fired, let's fire the callback
         */
        this.runCallback('open');
      }
    } else {
      delete this.callbackList[ eventName ];
    }
  },
};
