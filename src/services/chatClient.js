import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import {CHAT_URL} from './endpoints';

export const createChatClient = (callbacks = {}) => new Client({
    // A new transport and the current token are required for every reconnect.
    webSocketFactory: () => new SockJS(`${CHAT_URL}?token=${encodeURIComponent(Cookies.get('token') || '')}`),
    reconnectDelay: 5000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    debug: () => {},
    ...callbacks,
});
