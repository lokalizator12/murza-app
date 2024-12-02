// ChatHeader.js
import React, {useEffect, useRef, useState} from 'react';
import axios from '../../../axiosConfig';
import {Link} from 'react-router-dom';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';

const ChatHeader = ({receiverId}) => {
    const [receiver, setReceiver] = useState(null);
    const [isOnline, setIsOnline] = useState(false);
    const stompClient = useRef(null);

    useEffect(() => {
        axios
            .get(`/v1/profile/${receiverId}`)
            .then((response) => {
                setReceiver(response.data);
                setIsOnline(response.data.online);
            })
            .catch((error) => {
                console.error('Failed to fetch receiver details:', error);
            });

        connectToPresenceWebSocket();

        return () => {
            disconnectFromPresenceWebSocket();
        };
    }, [receiverId]);

    const connectToPresenceWebSocket = () => {
        const token = Cookies.get('token');
        const socket = new SockJS(`http://localhost:8080/ws/chat?token=${token}`);
        stompClient.current = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => {
                console.log('STOMP debug:', str);
            },
        });

        stompClient.current.onConnect = () => {
            console.log('Connected to Presence WebSocket in ChatHeader');

            stompClient.current.subscribe(`/topic/presence/${receiverId}`, (message) => {
                const presenceUpdate = JSON.parse(message.body);
                setIsOnline(presenceUpdate.online);
            });
        };

        stompClient.current.activate();
    };

    const disconnectFromPresenceWebSocket = () => {
        if (stompClient.current) {
            stompClient.current.deactivate();
        }
    };

    return (
        <div className="chat-header">
            {receiver ? (
                <>
                    <img
                        src={receiver.userPhoto}
                        alt="User Avatar"
                        className="chat-header-avatar"
                    />
                    <div className="chat-header-info">
                        <h2>{`${receiver.firstName} ${receiver.lastName}`}</h2>
                        <p>
                            {isOnline ? (
                                <span className="online-status">Online</span>
                            ) : (
                                <span>
                  Last seen: {new Date(receiver.lastActivityDate).toLocaleString()}
                </span>
                            )}
                        </p>
                    </div>
                    <Link to={`/profile/${receiverId}`} className="chat-header-profile-link">
                        View Profile
                    </Link>
                </>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
};

export default ChatHeader;
