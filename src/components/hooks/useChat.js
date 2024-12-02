import {useCallback, useEffect, useRef, useState} from 'react';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';
import axios from '../../axiosConfig';

export const useChat = (receiverId, user) => {
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = 20;
    const stompClient = useRef(null);
    const receiverIdRef = useRef(receiverId);

    useEffect(() => {
        receiverIdRef.current = receiverId;
    }, [receiverId]);

    useEffect(() => {
        if (receiverId && user) {
            // Reset state when receiver changes
            setMessages([]);
            setPage(0);
            setHasMore(true);
        }
    }, [receiverId, user]);

    useEffect(() => {
        if (receiverId && user) {
            loadMessages();
            markMessagesAsRead();
        }
    }, [receiverId, user, page]);

    useEffect(() => {
        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
            }
        };
    }, []);

    const loadMessages = useCallback(() => {
        if (!hasMore) return;

        axios
            .get(`/messages/${receiverId}?page=${page}&size=${pageSize}`)
            .then((response) => {
                const newMessages = response.data.content;
                setMessages((prevMessages) => {
                    const messageIds = new Set(prevMessages.map((msg) => msg.id));
                    const filteredNewMessages = newMessages.filter(
                        (msg) => !messageIds.has(msg.id)
                    );
                    return [...filteredNewMessages, ...prevMessages];
                });
                setHasMore(!response.data.last);
            })
            .catch((error) => {
                console.error('Failed to fetch messages:', error);
                setHasMore(false);
            });
    }, [receiverId, page, hasMore]);

    const markMessagesAsRead = useCallback(() => {
        axios
            .post(`/messages/markAsRead/${receiverId}`, null, {
                headers: {'Content-Type': 'application/json'},
            })
            .then(() => {
                setMessages((prevMessages) =>
                    prevMessages.map((msg) => ({...msg, read: true}))
                );
            })
            .catch((error) => {
                console.error('Failed to mark messages as read:', error);
            });
    }, [receiverId]);

    const onMessageReceived = useCallback(
        (payload) => {
            const message = JSON.parse(payload.body);
            const senderId = Number(message.sender.id);
            const receiverId = Number(message.receiver.id);
            const currentUserId = Number(user);
            const currentReceiverId = Number(receiverIdRef.current);

            if (
                (senderId === currentReceiverId && receiverId === currentUserId) ||
                (senderId === currentUserId && receiverId === currentReceiverId)
            ) {
                setMessages((prevMessages) => {
                    if (!prevMessages.some((msg) => msg.id === message.id)) {
                        return [...prevMessages, message];
                    } else {
                        return prevMessages;
                    }
                });

                if (senderId === currentReceiverId) {
                    markMessagesAsRead();
                }
            }
        },
        [user, markMessagesAsRead]
    );

    const onReadReceiptReceived = useCallback(
        (payload) => {
            const senderId = Number(payload.body);
            if (senderId === Number(receiverIdRef.current)) {
                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        Number(msg.sender.id) === Number(user) &&
                        Number(msg.receiver.id) === senderId
                            ? {...msg, read: true}
                            : msg
                    )
                );
            }
        },
        [user]
    );

    const connectToWebSocket = useCallback(() => {
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
            console.log('Connected to WebSocket');
            stompClient.current.subscribe('/user/queue/messages', onMessageReceived);
            stompClient.current.subscribe(
                '/user/queue/read-receipts',
                onReadReceiptReceived
            );
        };

        stompClient.current.activate();
    }, [onMessageReceived, onReadReceiptReceived]);

    const disconnectFromWebSocket = useCallback(() => {
        if (stompClient.current) {
            stompClient.current.deactivate();
        }
    }, []);

    const sendMessage = (content) => {
        if (
            content.trim() !== '' &&
            receiverId &&
            stompClient.current &&
            stompClient.current.connected
        ) {
            const chatMessage = {
                receiverId,
                content,
            };
            stompClient.current.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(chatMessage),
            });
        }
    };

    const loadMoreMessages = useCallback(() => {
        if (hasMore) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [hasMore]);

    return {
        messages,
        sendMessage,
        connectToWebSocket,
        disconnectFromWebSocket,
        loadMoreMessages,
        hasMore,
    };
};
