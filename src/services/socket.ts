import Ws from '@adonisjs/websocket-client';
import { getToken } from './axios';

const env = require(`../env/${ process.env.NODE_ENV }.env`);

interface ISubscription {
  emit: (arg:string, arg1?:Object) => void
  on: (arg:string, arg1:(data:any) => any) => void
}

interface IWebsocket {
  callbackList: { [key: string]: () => void };
  ws: null | {
    emit: (arg:string, arg1?:Object) => void
    on: (arg:string, arg1:() => void) => void
    subscribe: (arg:string) => ISubscription
    close: () => void
  };
  subscription: null | ISubscription;
  roomId: string;
  connect: () => Promise<void>;
  subscribe: () => Promise<void | Object>;
  on: (arg:string, arg1:() => void) => void;
  off: (arg:string) => void;
  setRoomId: (arg:string) => void;
  setCallback: (arg:string, arg1?:() => void) => void;
  emit: (arg:string, arg1?:Object) => void
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
  connect() {
    if ( this.ws ) {
      try {
        this.close();
      } catch (error) {
        this.ws.emit('close');
        console.log('error');
        this.ws = null;
      }

      return new Promise( resolve => {
        setTimeout( async () => {
          await this.connect();
          resolve();
        }, 500);
      });
    }

    return new Promise( async (resolve, reject) => {
      try {
        const token = getToken();
        this.ws = this.ws || await Ws(env.API_URL_WEBSOCKET)
          .withApiToken( token )
          .connect();

        this.ws?.on('close', () => {
          console.log('close --- close ALLL!!!');
          this.close();
          this.runCallback('close');
        });

        this.ws?.on('open', async () => {
          console.log('connected');
          this.runCallback('open');

          await this.subscribe();
          resolve();
        });

        this.ws?.on('error', () => {
          this.runCallback('error');
          reject();
          console.log('disconnected');
        });
      } catch (err) {
        console.log(err);
      }
    });
  },

  emit(event, payload) {
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
    return new Promise( async (resolve, reject) => {
      if (!this.ws) {
        throw new Error('Websocket not connected. Subscription not available.');
      }

      try {
        this.subscription = this.subscription || await this.ws?.subscribe(`room:${ this.roomId }`);
      } catch (err) {
        console.log(err);
      }

      this.subscription?.on('ready', () => {
        console.log('ready');
        resolve();
      });

      this.subscription?.on('all-data', (data) => {
        console.log('allData', data);
        resolve(data);
      });

      this.subscription?.on('error', (e) => {
        console.log('error', e);
        reject(e);
      });

      this.subscription?.on('close', (e) => {
        console.log('close', e);
        console.log('--- subscription close ---');
        this.close();
        reject(e);
      });

      // this.subscription.on('message', (message) => {
      //     console.log('message', message);
      // })

      // this.subscription.on('viewed', (messageIdList) => {
      //     console.log('viewed', messageIdList);
      // })
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
    console.log('run', eventName);

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

      // if (eventName === 'all-data' && this.ws) {

      //     /**
      //      * Event open already fired, let's fire the callback
      //      */
      //     this.runCallback('all-data')
      // }
    } else {
      delete this.callbackList[ eventName ];
    }
  },
};
