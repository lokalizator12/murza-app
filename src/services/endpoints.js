const apiBase = process.env.REACT_APP_API_BASE_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api/' : '/api/');

export const API_BASE_URL = apiBase.endsWith('/') ? apiBase : `${apiBase}/`;
export const CHAT_URL = process.env.REACT_APP_CHAT_URL ||
    (process.env.NODE_ENV === 'development' ? 'http://localhost:8080/ws/chat' : '/ws/chat');
