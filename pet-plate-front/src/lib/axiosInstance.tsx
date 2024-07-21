import axios from 'axios';

const NEXT_PUBLIC_API_URL = 'http://13.209.156.246:8080/api/v1';

//const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window === 'undefined') {
      // 서버 컴포넌트에서 쿠키에서 토큰을 읽음
      const { cookies } = require('next/headers');
      const cookieStore = cookies();
      const accessToken = cookieStore.get('accessToken')?.value;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log('서버', accessToken);
      }
    } else {
      // 클라이언트 컴포넌트에서는 기존 로직 사용
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        console.log('클라이언트', accessToken);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
