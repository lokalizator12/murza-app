import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import Cookies from 'js-cookie';
import axios from '../axiosConfig';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userLocal, setUserLocal] = useState(null);
    const [user, setUser] = useState(null);
    const stompClient = useRef(null);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        connectToPresenceWebSocket();
    };

    const logout = async () => {
        try {
            await updateLastSeen(); // Устанавливаем время последнего входа
            await axios.post('/auth/logout');
            Cookies.remove('token');
            setIsAuthenticated(false);
            setUser(null);
            disconnectFromPresenceWebSocket();
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const connectToPresenceWebSocket = () => {
        const token = Cookies.get('token');
        const socket = new SockJS(`http://localhost:8080/ws/chat?token=${token}`);
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: (str) => {
                console.log('STOMP debug:', str);
            },
        });

        stompClient.current.onConnect = () => {
            console.log('Connected to Presence WebSocket');
            stompClient.current.publish({
                destination: '/app/presence/online',
                body: '',
            });
        };

        stompClient.current.onDisconnect = () => {
            console.log('Disconnected from Presence WebSocket');
            updateLastSeen(); // Устанавливаем время последнего входа при отключении WebSocket
        };

        stompClient.current.activate();
    };

    const disconnectFromPresenceWebSocket = () => {
        if (stompClient.current) {
            stompClient.current.deactivate();
        }
    };

    const updateLastSeen = async () => {
        try {
            await axios.post('v1/user/updateLastSeen', null, {
                headers: {'Content-Type': 'application/json'},
            });
            console.log('Last seen updated');
        } catch (error) {
            console.error('Failed to update last seen:', error);
        }
    };

    useEffect(() => {
        const token = Cookies.get('token');
        setIsAuthenticated(!!token);

        if (token) {
            axios
                .get('/auth/me')
                .then((response) => {
                    setUserLocal(response.data.id);
                    connectToPresenceWebSocket();
                })
                .catch((error) => {
                    console.error('Failed to fetch user details:', error);
                    setUserLocal(null);
                });
        }

        const handleBeforeUnload = () => {
            updateLastSeen(); // Устанавливаем время последнего входа при закрытии страницы
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            disconnectFromPresenceWebSocket();
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <AuthContext.Provider value={{isAuthenticated, user, userLocal, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
