import _axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = _axios.create();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const env = require(`../env/${ process.env.NODE_ENV }.env`);

axiosInstance.defaults.baseURL = env.API_URL;
axiosInstance.defaults.withCredentials = true;

export const axios = axiosInstance;

export const getToken = function ():string {
  return Cookies.get('token') || '';
};

export const setToken = function (token:string):void {
  Cookies.set('token', token);
};

export const clearToken = function ():void {
  Cookies.set('token', '');
};
