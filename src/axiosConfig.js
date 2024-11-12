import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

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
        console.log('JWT Token:', token);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        console.log('Response:', {
            url: response.config.url,
            status: response.status,
            data: response.data,
        });
        return response;
    },
    (error) => {
        if (error.response) {
            const { status } = error.response;

            // Если ошибка 401 или 403, перенаправляем на страницу входа
            if (status === 401 || status === 403) {
                console.warn('Unauthorized! Redirecting to login.');
                window.location.href = '/login'; // Перенаправление на страницу входа
            }

            // Логирование ошибок на основе статуса
            console.error('Error Response:', {
                url: error.response.config.url,
                status: status,
                data: error.response.data,
            });
        } else {
            console.error('Error Message:', error.message);
        }
        return Promise.reject(error);
    }
);

export default axios;
