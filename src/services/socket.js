import Ws from '@adonisjs/websocket-client'
import {getToken} from './axios'

const env = require(`../env/${ process.env.NODE_ENV }.env`)

export const websocket = {
    callbackList : {},

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
                    await this.connect()
                    resolve();
                }, 500);
            });
        }

        return new Promise( async (resolve, reject) => {
            try {
                const token = getToken()
                this.ws = this.ws || await Ws(env.API_URL_WEBSOCKET)
                    .withApiToken( token )
                    .connect()

                this.ws.on('close', () => {
                    console.log('close --- close ALLL!!!')
                    this.close();
                    this.runCallback('close');
                })

                this.ws.on('open', async () => {
                    console.log('connected')
                    this.runCallback('open');

                    await this.subscribe()
                    resolve()
                })

                this.ws.on('error', () => {
                    this.runCallback('error');
                    reject()
                    console.log('disconnected')
                })
            }
            catch (err) {
                console.log(err)
            }
        })
    },

    emit(event, payload) {
        this.subscription?.emit(event, payload);
    },

    close() {
        this.ws && this.ws.close()
        this.ws       = undefined;
        this.subscription = undefined;
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
                this.subscription = this.subscription || await this.ws.subscribe(`room:${ this.roomId }`)
            }
            catch(err) {
                console.log(err)
            }

            this.subscription.on('ready', () => {
                console.log('ready')
                resolve()
            })

            this.subscription.on('all-data', (data) => {
                console.log('all-data', data)
                resolve(data)
            })

            this.subscription.on('error', (e) => {
                console.log('error', e)
                reject(e)
            })

            this.subscription.on('close', (e) => {
                console.log('close', e)
                console.log('--- subscription close ---')
                this.close();
                reject(e)
            })

            // this.subscription.on('message', (message) => {
            //     console.log('message', message);
            // })

            // this.subscription.on('viewed', (messageIdList) => {
            //     console.log('viewed', messageIdList);
            // })
        })
    },

    on(eventName, handler) {
        if (!this.ws) {
            return;
        }

        this.setCallback(eventName, handler)
    },

    off(eventName) {
        if (!this.ws) {
            return;
        }

        this.setCallback(eventName)
    },

    runCallback(eventName) {
        console.log('run', eventName);

        this.callbackList[ eventName ] && this.callbackList[ eventName ].call();
    },

    setCallback(eventName, handler) {
        if (handler) {
            this.callbackList[ eventName ] = handler;

            if (eventName === 'open' && this.ws) {

                /**
                 * Event open already fired, let's fire the callback
                 */
                this.runCallback('open')
            }

            // if (eventName === 'all-data' && this.ws) {

            //     /**
            //      * Event open already fired, let's fire the callback
            //      */
            //     this.runCallback('all-data')
            // }
        }
        else {
            delete this.callbackList[ eventName ];
        }
    }
}
