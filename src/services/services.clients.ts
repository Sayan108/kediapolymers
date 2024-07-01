// apiClient.ts
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {activeURL} from './constants';
import {store} from '../redux';
const state = store.getState();
const token = state.auth.userDetails?.accessToken ?? '';
console.log(token);

const axiosConfig: AxiosRequestConfig = {
  baseURL: activeURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

const axiosAuthConfig: AxiosRequestConfig = {
  baseURL: activeURL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const baseClient: AxiosInstance = axios.create(axiosConfig);
export const authClient: AxiosInstance = axios.create(axiosAuthConfig);

baseClient.interceptors.request.use(
  config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
