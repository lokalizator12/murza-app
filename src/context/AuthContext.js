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

    // Function to notify presence status
    const updatePresenceStatus = (status) => {
        if (stompClient.current && stompClient.current.connected) {
            stompClient.current.publish({
                destination: `/app/presence/${status}`,
                body: JSON.stringify({userId: userLocal}),
            });
        }
    };

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        connectToPresenceWebSocket();
    };

    const logout = async () => {
        try {
            // Notify server about going offline
            updatePresenceStatus('offline');
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
        if (!token) {
            console.error('No token found. Cannot establish WebSocket connection.');
            return;
        }

        const socket = new SockJS(`http://localhost:8080/ws/chat?token=${token}`);
        stompClient.current = new Client({
            webSocketFactory: () => socket,
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

