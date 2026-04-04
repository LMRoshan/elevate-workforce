import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://elevate-workforce.onrender.com/api',
});

// Add a request interceptor to attach the JWT token
instance.interceptors.request.use(
  (config) => {
    // Retrieve the token saved during login/registration
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;