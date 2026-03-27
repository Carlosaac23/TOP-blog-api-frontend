import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('bloggering_token');

  config.headers = config.headers ?? {};
  config.headers['Content-Type'] = 'application/json';

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
