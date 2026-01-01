import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('BookSwap_Token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
})

export default instance;