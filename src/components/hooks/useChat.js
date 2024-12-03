import { useCallback, useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
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
            console.log('Resetting state for new receiver:', receiverId);
            setMessages([]); // Сбрасываем сообщения
            setPage(0); // Сбрасываем страницу
            setHasMore(true); // Сбрасываем флаг
            loadMessages(); // Загружаем сообщения
            markMessagesAsRead(); // Помечаем сообщения как прочитанные
        }
    }, [receiverId, user]);

    useEffect(() => {
        if (receiverId && user) {
            console.log('Loading messages and marking as read for receiver:', receiverId);
            loadMessages();
            markMessagesAsRead();
        }
    }, [receiverId, user, page]);

    useEffect(() => {
        return () => {
            if (stompClient.current) {
                stompClient.current.deactivate();
                console.log('WebSocket client deactivated');
            }
        };
    }, []);

    const loadMessages = useCallback(() => {
        if (!hasMore) return;

        console.log('Loading messages for page:', page);
        axios
            .get(`/messages/${receiverId}?page=${page}&size=${pageSize}`)
            .then((response) => {
                const newMessages = response.data.content || [];
                console.log('Loaded messages:', newMessages);

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
        console.log('Marking messages as read for receiverId:', receiverId);

        if (
            receiverId &&
            stompClient.current &&
            stompClient.current.connected
        ) {
            console.log('Sending read receipt for receiverId:', receiverId);
            stompClient.current.publish({
                destination: '/app/chat.readReceipt',
                body: String(receiverId), // Отправляем как строку
            });
        } else {
            console.error('Unable to send read receipt. WebSocket not connected or receiverId is null.');
        }

        // Локальное обновление статусов сообщений
        setMessages((prevMessages) =>
            prevMessages.map((msg) => ({ ...msg, status: 'READ' }))
        );
    }, [receiverId]);

    const onMessageReceived = useCallback(
        (payload) => {
            const message = JSON.parse(payload.body);
            console.log('Message received:', message);

            const senderId = Number(message.senderId);
            const receiverId = Number(message.receiverId);
            const currentUserId = Number(user);
            const currentReceiverId = Number(receiverIdRef.current);

            console.log('Sender ID:', senderId, 'Receiver ID:', receiverId);
            console.log('Current User ID:', currentUserId, 'Current Receiver ID:', currentReceiverId);

            if (
                (senderId === currentReceiverId && receiverId === currentUserId) ||
                (senderId === currentUserId && receiverId === currentReceiverId)
            ) {
                console.log('Message matches current conversation');
                setMessages((prevMessages) => {
                    if (!prevMessages.some((msg) => msg.id === message.id)) {
                        return [...prevMessages, message];
                    } else {
                        return prevMessages;
                    }
                });

                if (senderId === currentReceiverId) {
                    console.log('Marking messages as read for sender:', senderId);
                    markMessagesAsRead();
                }
            } else {
                console.log('Message does not match current conversation');
            }
        },
        [user, markMessagesAsRead]
    );

    const onReadReceiptReceived = useCallback(
        (payload) => {
            const senderId = Number(payload.body);
            const currentReceiverId = Number(receiverIdRef.current);
            console.log('Read receipt received from sender:', senderId);

            if (senderId === currentReceiverId) {
                console.log('Updating messages to READ for sender:', senderId);
                setMessages((prevMessages) =>
                    prevMessages.map((msg) =>
                        Number(msg.senderId) === Number(user) && Number(msg.receiverId) === senderId
                            ? { ...msg, status: 'READ' }
                            : msg
                    )
                );
            } else {
                console.log('Read receipt does not match current conversation');
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
            console.log('Subscribed to /user/queue/read-receipts');
        };

        stompClient.current.activate();
    }, [onMessageReceived, onReadReceiptReceived]);

    const disconnectFromWebSocket = useCallback(() => {
        if (stompClient.current) {
            stompClient.current.deactivate();
            console.log('Disconnected from WebSocket');
        }
    }, []);

    const sendMessage = (content) => {
        if (
            content.trim() !== '' &&
            receiverId &&
            stompClient.current &&
            stompClient.current.connected
        ) {
            console.log('Sending message to receiver:', receiverId);
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
            console.log('Loading more messages');
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
