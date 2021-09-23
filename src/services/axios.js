/* eslint-disable @typescript-eslint/no-var-requires */
import _axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = _axios.create();

// eslint-disable-next-line no-undef
const env = require(`../env/${ process.env.NODE_ENV }.env`);

axiosInstance.defaults.baseURL = env.API_URL;
axiosInstance.defaults.withCredentials = true;

export const axios = axiosInstance;

export const getToken = function () {
  const token = Cookies.get('token');
  return token;
};

export const setToken = function (token) {
  Cookies.set('token', token);
};

export const clearToken = function () {
  Cookies.set('token', '');
};
