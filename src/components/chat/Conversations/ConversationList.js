// ConversationList.js
import React, { useEffect, useRef, useState } from 'react';
import axios from '../../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import './ConversationList.css';

const ConversationList = () => {
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const stompClient = useRef(null);

    useEffect(() => {
        loadConversations();

        connectToWebSocket();

        return () => {
            disconnectFromWebSocket();
        };
    }, []);

    const loadConversations = () => {
        setLoading(true);
        axios
            .get('/conversations')
            .then((response) => {
                setConversations(response.data);
            })
            .catch((error) => {
                console.error('Failed to fetch conversations:', error);
            }).finally(() => {
            setLoading(false);
        });
    };

    const handleConversationClick = (interlocutorId) => {
        navigate(`/chat/${interlocutorId}`);

        // Mark messages as read
        axios.post(`/messages/markAsRead/${interlocutorId}`, null, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Update conversations state to remove unread messages count
        setConversations((prevConversations) =>
            prevConversations.map((conv) =>
                conv.interlocutorId === interlocutorId
                    ? { ...conv, unreadMessages: 0 }
                    : conv
            )
        );
    };

    const connectToWebSocket = () => {
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
            console.log('Connected to WebSocket in ConversationList');

            stompClient.current.subscribe('/user/queue/messages', onMessageReceived);
        };

        stompClient.current.activate();
    };

    const disconnectFromWebSocket = () => {
        if (stompClient.current) {
            stompClient.current.deactivate();
        }
    };

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        const senderId = Number(message.senderId);

        setConversations((prevConversations) => {
            const existingConversation = prevConversations.find(
                (conv) => Number(conv.interlocutorId) === senderId
            );

            if (existingConversation) {
                // Move the conversation to the top and update last message and unread count
                return [
                    {
                        ...existingConversation,
                        lastMessage: message.content,
                        lastMessageTimestamp: message.timestamp,
                        unreadMessages: existingConversation.unreadMessages + 1,
                    },
                    ...prevConversations.filter(
                        (conv) => Number(conv.interlocutorId) !== senderId
                    ),
                ];
            } else {
                // Load the conversation from the server
                loadConversations();
                return prevConversations;
            }
        });
    };

    return (
        <div className="conversation-list">
            {loading ? (
                <p></p>
            ) : conversations.length === 0 ? (
                <p>No conversations yet.</p>
            ) : (
                <ul>
                    {conversations.map((conv) => (
                        <li
                            key={conv.interlocutorId}
                            onClick={() => handleConversationClick(conv.interlocutorId)}
                        >
                            <div className="conversation-item">
                                <img
                                    src={conv.interlocutorPhoto}
                                    alt="User Avatar"
                                    className="conversation-avatar"
                                />
                                <div className="conversation-details">
                  <span className="conversation-name">
                    {conv.interlocutorName}
                  </span>
                                    <span className="conversation-last-message">
                    {conv.lastMessage
                        ? `${conv.lastMessage.slice(0, 20)}${
                            conv.lastMessage.length > 20 ? '...' : ''
                        }`
                        : 'No messages yet'}
                  </span>
                                </div>
                                <div className="conversation-meta">
                  <span className="conversation-timestamp">
                    {new Date(conv.lastMessageTimestamp).toLocaleString()}
                  </span>
                                    {conv.unreadMessages > 0 && (
                                        <span className="conversation-unread">
                      {conv.unreadMessages}
                    </span>
                                    )}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ConversationList;
