import axios from 'axios';
import Cookies from 'js-cookie';
import authService from "./services/authService";

// Base URL for API
axios.defaults.baseURL = 'http://localhost:8080/api/';

// Flag to avoid infinite retry loops
let isRefreshing = false;
let failedQueue = [];

// Process queue of failed requests after token refresh
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Axios request interceptor
axios.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token'); // Get access token from cookies
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Axios response interceptor
axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            const { status } = error.response;

            if (status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                if (!isRefreshing) {
                    isRefreshing = true;

                    try {
                        const refreshResponse = await axios.post('/auth/refresh', {}, { withCredentials: true });
                        const newAccessToken = refreshResponse.data.token;

                        Cookies.set('token', newAccessToken, { expires: 1, secure: true }); // Set new token (1-day expiry)
                        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                        processQueue(null, newAccessToken);
                        isRefreshing = false;

                        // Retry the original request
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axios(originalRequest);
                    } catch (refreshError) {
                        processQueue(refreshError, null);
                        isRefreshing = false;

                        // Logout and redirect to login page
                        console.warn('Token refresh failed. Logging out...');
                        await authService.logout();
                        Cookies.remove('token');
                        window.location.href = '/login';
                        return Promise.reject(refreshError);
                    }
                }

                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        return axios(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            // Handle other status codes (e.g., 403)
            if (status === 403) {
                console.warn('Access forbidden. Redirecting to login.');
                await authService.logout();
                Cookies.remove('token');
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);

export default axios;
