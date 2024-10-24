import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.baseURL = 'http://localhost:8080/api/';

axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('Request:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data,
        });
        console.log('JWT Token:', token); // Логируем токен
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        // Log the response details
        console.log('Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data,
        });
        return response;
    },
    (error) => {
        // Log the error response
        if (error.response) {
            console.error('Error Response:', {
                url: error.response.config.url,
                status: error.response.status,
                data: error.response.data,
            });
        } else {
            console.error('Error Message:', error.message);
        }
        return Promise.reject(error);
    }
);
export default axios;
