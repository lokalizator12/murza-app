import axios from 'axios';
import Cookies from 'js-cookie';
import {API_BASE_URL} from './services/endpoints';

axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

let refreshPromise = null;
let redirectingToLogin = false;

const authAction = (url) => String(url || '').match(/(?:^|\/)auth\/([^/?#]+)/)?.[1];
const isPublicAuthRequest = (url) =>
    ['login', 'signup', 'refresh', 'forgot-password', 'reset-password', 'validate-token']
        .includes(authAction(url));

axios.interceptors.request.use((config) => {
    if (isPublicAuthRequest(config.url)) {
        delete config.headers.Authorization;
        return config;
    }

    const token = Cookies.get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config;
        const action = authAction(request?.url);

        if (error.response?.status !== 401 || !request || request._retry ||
            isPublicAuthRequest(request.url) || action === 'logout' || !Cookies.get('token')) {
            return Promise.reject(error);
        }

        request._retry = true;
        try {
            if (!refreshPromise) {
                refreshPromise = axios.post('auth/refresh', {}, {withCredentials: true})
                    .finally(() => { refreshPromise = null; });
            }
            const {data} = await refreshPromise;
            if (!data?.token) {
                throw new Error('Token refresh returned no access token');
            }

            Cookies.set('token', data.token, {
                expires: data.expiresIn / 86400000,
                secure: window.location.protocol === 'https:',
                sameSite: 'Lax',
            });
            request.headers.Authorization = `Bearer ${data.token}`;
            return axios(request);
        } catch (refreshError) {
            Cookies.remove('token');
            if (!redirectingToLogin && window.location.pathname !== '/login') {
                redirectingToLogin = true;
                window.location.assign('/login');
            }
            return Promise.reject(refreshError);
        }
    }
);

export default axios;
