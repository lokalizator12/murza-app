import React, {useEffect, useRef, useState} from 'react';
import axios from '../../../axiosConfig';
import {Link} from 'react-router-dom';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import './ChatHeader.css'

const ChatHeader = ({receiverId}) => {
    const [receiver, setReceiver] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const [lastSeen, setLastSeen] = useState(null);
    const stompClient = useRef(null);

    useEffect(() => {
        fetchReceiverDetails();
        connectToPresenceWebSocket();

        return () => disconnectFromPresenceWebSocket();
    }, [receiverId]);

    const fetchReceiverDetails = async () => {
        try {
            const response = await axios.get(`/v1/profile/${receiverId}`);
            setReceiver(response.data);
            setIsOnline(response.data.online);
            setLastSeen(response.data.lastActivityDate);
        } catch (error) {
            console.error('Failed to fetch receiver details:', error);
        }
    };

    const connectToPresenceWebSocket = () => {
        const token = Cookies.get('token');
        const socket = new SockJS(`http://localhost:8080/ws/chat?token=${token}`);
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => console.log('STOMP debug:', str),
        });

        stompClient.current.onConnect = () => {
            stompClient.current.subscribe(`/topic/presence/${receiverId}`, (message) => {
                const presenceUpdate = JSON.parse(message.body);
                if (presenceUpdate.userId === receiverId) {
                    setIsOnline(presenceUpdate.online);
                    if (!presenceUpdate.online) {
                        setLastSeen(presenceUpdate.lastSeen || new Date().toISOString());
                    }
                }
            });
        };

        stompClient.current.activate();
    };

    const disconnectFromPresenceWebSocket = () => {
        if (stompClient.current) stompClient.current.deactivate();
    };

    const formatLastSeen = (timestamp) => {
        if (!timestamp) return 'Недавно';

        const lastSeenDate = new Date(timestamp);
        const now = new Date();
        const diffMs = now - lastSeenDate;

        if (diffMs < 60 * 1000) {
            return 'Только что';
        } else if (diffMs < 60 * 60 * 1000) {
            const minutes = Math.floor(diffMs / (60 * 1000));
            return `${minutes} минут назад`;
        } else {
            return lastSeenDate.toLocaleString();
        }
    };

    return (
        <div className="chat-header">
            {receiver ? (
                <>
                    <img src={receiver.userPhoto} alt="User Avatar" className="chat-header-avatar"/>
                    <div className="chat-header-info">
                        <h2>{`${receiver.firstName} ${receiver.lastName}`}</h2>
                        <p>
                            {isOnline ? (
                                <span className="online-status">Online</span>
                            ) : (
                                <span>Last seen: {formatLastSeen(lastSeen)}</span>
                            )}
                        </p>
                    </div>
                    <Link to={`/profile/${receiverId}`}
                          className="navbar8-action11 thq-button-filled thq-button-animated">View Profile</Link>
                </>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
};

export default ChatHeader;
