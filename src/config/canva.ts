import axios, { AxiosRequestConfig } from "axios";
import dotenv from "dotenv"
dotenv.config()

const canvaApi = axios.create({
  baseURL: process.env.CANVA_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const canvaBuilder = (token: string) => {
  return {
    get: (url: string, config: AxiosRequestConfig = {}) => canvaApi.get(url, { ...config, headers: { Authorization: `Bearer ${token}`, ...config.headers } }),
    post: (url: string, data: any = {}, config: AxiosRequestConfig = {}) => canvaApi.post(url, data, { ...config, headers: { Authorization: `Bearer ${token}`, ...config.headers } }),
    put: (url: string, data: any, config: AxiosRequestConfig = {}) => canvaApi.put(url, data, { ...config, headers: { Authorization: `Bearer ${token}`, ...config.headers } }),
    patch: (url: string, data: any, config: AxiosRequestConfig = {}) => canvaApi.patch(url, data, { ...config, headers: { Authorization: `Bearer ${token}`, ...config.headers } }), // PATCH so'rov
    delete: (url: string, config: AxiosRequestConfig = {}) => canvaApi.delete(url, { ...config, headers: { Authorization: `Bearer ${token}`, ...config.headers } }),
  };
};
