import axios from 'axios';

// Create a custom axios instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // replace with the URL of your API
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); // replace with your token, it might come from context, localstorage, etc.
        if (token) {
            config.headers['Authorization'] = token; // sets the token in the Authorization header
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export default axiosInstance;
