import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN as string;


axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
   
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
