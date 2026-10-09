import {useCallback, useEffect, useRef, useState} from 'react';
import axios from '../../axiosConfig';
import {createChatClient} from '../../services/chatClient';
import {chatSendError, mergeMessages} from '../../services/chatMessages';

export const useChat = (receiverId, user) => {
    const [messages, setMessages] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [historyError, setHistoryError] = useState('');
    const [sendError, setSendError] = useState('');
    const [sending, setSending] = useState(false);
    const [connected, setConnected] = useState(false);
    const client = useRef(null);
    const active = useRef(false);
    const page = useRef(0);
    const loadingPage = useRef(false);
    const sendingRef = useRef(false);

    const markRead = useCallback(() => {
        if (client.current?.connected) client.current.publish({destination: '/app/chat.readReceipt', body: String(receiverId)});
        setMessages(current => current.map(message => Number(message.receiverId) === Number(user)
            ? {...message, status: 'READ'} : message));
        window.dispatchEvent(new Event('murza:conversations-changed'));
    }, [receiverId, user]);

    const loadPage = useCallback(async (pageNumber) => {
        if (loadingPage.current) return;
        loadingPage.current = true;
        setLoading(true);
        setHistoryError('');
        try {
            const {data} = await axios.get(`/messages/${receiverId}`, {params: {page: pageNumber, size: 20}});
            if (!active.current) return;
            setMessages(current => mergeMessages(current, data.content || []));
            page.current = pageNumber;
            setHasMore(!data.last);
            try {
                await axios.post(`/messages/markAsRead/${receiverId}`);
                if (active.current) markRead();
            } catch {
                if (active.current) setHistoryError('Messages loaded, but their read status could not be updated. Try again.');
            }
        } catch (error) {
            if (active.current) setHistoryError('Messages could not be loaded. Check your connection and try again.');
        } finally {
            loadingPage.current = false;
            if (active.current) setLoading(false);
        }
    }, [receiverId, markRead]);

    useEffect(() => {
        if (!user) return;
        active.current = true;
        loadPage(0);
        let firstConnection = true;
        const connection = createChatClient({
            onConnect: () => {
                if (!active.current) return;
                setConnected(true);
                connection.subscribe('/user/queue/messages', payload => {
                    let message;
                    try { message = JSON.parse(payload.body); } catch { return; }
                    if ((Number(message.senderId) === Number(user) && Number(message.receiverId) === Number(receiverId)) ||
                        (Number(message.senderId) === Number(receiverId) && Number(message.receiverId) === Number(user))) {
                        setMessages(current => mergeMessages(current, [message]));
                        if (Number(message.senderId) === Number(receiverId)) markRead();
                    }
                });
                connection.subscribe('/user/queue/read-receipts', payload => {
                    if (Number(payload.body) === Number(receiverId)) setMessages(current => current.map(message =>
                        Number(message.senderId) === Number(user) ? {...message, status: 'READ'} : message));
                });
                markRead();
                // Recover messages that arrived while the live connection was offline.
                if (!firstConnection) loadPage(0);
                firstConnection = false;
            },
            onWebSocketClose: () => { if (active.current) setConnected(false); },
            onStompError: () => { if (active.current) setConnected(false); },
        });
        client.current = connection;
        connection.activate();
        return () => { active.current = false; connection.deactivate(); client.current = null; };
    }, [receiverId, user, loadPage, markRead]);

    const sendMessage = async content => {
        if (sendingRef.current || !content.trim()) return false;
        sendingRef.current = true;
        setSending(true);
        setSendError('');
        try {
            const {data} = await axios.post('/messages', {receiverId: Number(receiverId), content: content.trim()}, {timeout: 15000});
            if (active.current) setMessages(current => mergeMessages(current, [data]));
            window.dispatchEvent(new Event('murza:conversations-changed'));
            return true;
        } catch (error) {
            if (active.current) setSendError(chatSendError(error));
            return false;
        } finally {
            sendingRef.current = false;
            if (active.current) setSending(false);
        }
    };
    return {messages, sendMessage, hasMore, loading, historyError, sendError, sending, connected,
        loadMoreMessages: () => loadPage(page.current + 1), retryHistory: () => loadPage(page.current)};
};
