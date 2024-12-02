// ChatContainer.js
import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useChat} from '../../hooks/useChat';
import {useAuth} from '../../../context/AuthContext';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import '../Chat.css';

const ChatContainer = () => {
    const {userId} = useParams();
    const receiverId = userId;
    const {userLocal} = useAuth();
    const {
        messages,
        sendMessage,
        connectToWebSocket,
        disconnectFromWebSocket,
        loadMoreMessages,
        hasMore,
    } = useChat(receiverId, userLocal);

    useEffect(() => {
        if (userLocal && receiverId) {
            connectToWebSocket();
        }
        return () => {
            disconnectFromWebSocket();
        };
    }, [receiverId, userLocal]);

    const handleSendMessage = (content) => {
        sendMessage(content);
    };

    return (
        <div className="chat-container">
            <ChatHeader receiverId={receiverId}/>
            <MessageList
                messages={messages}
                userId={userLocal}
                loadMoreMessages={loadMoreMessages}
                hasMore={hasMore}
            />
            <MessageInput onSendMessage={handleSendMessage}/>
        </div>
    );
};

export default ChatContainer;
