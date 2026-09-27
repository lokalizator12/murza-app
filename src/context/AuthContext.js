import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import Cookies from 'js-cookie';
import axios from '../axiosConfig';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {CHAT_URL} from '../services/endpoints';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(Cookies.get('token')));
    const [userLocal, setUserLocal] = useState(() => localStorage.getItem('currentUserId'));
    const [user, setUser] = useState(null);
    const stompClient = useRef(null);

    // Function to notify presence status
    const updatePresenceStatus = (status) => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.publish({
                destination: `/app/presence/${status}`,
                body: JSON.stringify({userId: userLocal}),
            });
        }
    };

    const login = (userData, userId) => {
        setIsAuthenticated(true);
        setUser(userData);
        setUserLocal(userId);
        connectToPresenceWebSocket();
    };

    const logout = async () => {
        try {
            // Notify server about going offline
            updatePresenceStatus('offline');
            await axios.post('/auth/logout');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            Cookies.remove('token');
            localStorage.removeItem('currentUserId');
            localStorage.removeItem('currentCountMessages');
            setIsAuthenticated(false);
            setUser(null);
            setUserLocal(null);
            disconnectFromPresenceWebSocket();
            window.location.href = '/';
        }
    };

    const connectToPresenceWebSocket = () => {
        const token = Cookies.get('token');
        if (!token) {
            console.error('No token found. Cannot establish WebSocket connection.');
            return;
        }

        stompClient.current = new Client({
            webSocketFactory: () => new SockJS(`${CHAT_URL}?token=${token}`),
            reconnectDelay: 5000,
            debug: (str) => {
                console.log('STOMP debug:', str);
            },
        });

        stompClient.current.onConnect = () => {
            console.log('Connected to Presence WebSocket');
            updatePresenceStatus('online'); // Notify online status
        };

        stompClient.current.onDisconnect = () => {
            console.log('Disconnected from Presence WebSocket');
            updatePresenceStatus('offline'); // Notify offline status
        };

        stompClient.current.activate();
    };

    const disconnectFromPresenceWebSocket = () => {
        if (stompClient.current) {
            updatePresenceStatus('offline'); // Notify offline status before disconnecting
            stompClient.current.deactivate();
            stompClient.current = null;
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
            updatePresenceStatus('offline'); // Notify server of offline status when closing the page
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
