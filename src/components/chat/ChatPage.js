// ChatPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatContainer from './Chat/ChatContainer';
import ConversationList from './Conversations/ConversationList';
import './Chat.css';

const ChatPage = () => {
    const { userId } = useParams();
    return (
        <div className="chat-page">
            <ConversationList />
            {userId ? (
                <ChatContainer receiverId={userId} />
            ) : (
                <div className="chat-placeholder">
                    <p>Select a conversation to start chatting</p>
                </div>
            )}
        </div>
    );
};

export default ChatPage;
