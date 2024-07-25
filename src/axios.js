import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true 
});

axiosInstance.interceptors.request.use(config => {
  const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token.split('=')[1];
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const fetchCsrfToken = async () => {
  try {
    const response = await axiosInstance.get('/auth/csrf-token');
    const token = response.data.csrfToken;
    document.cookie = `XSRF-TOKEN=${token}; path=/; SameSite=None;`;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
};

export default axiosInstance;



// document.cookie = `XSRF-TOKEN=${token}; path=/; SameSite=None; Secure;`;




