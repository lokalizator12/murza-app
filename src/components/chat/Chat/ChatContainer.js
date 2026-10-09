import React from 'react';
import {useChat} from '../../hooks/useChat';
import {useAuth} from '../../../context/AuthContext';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatContainer = ({receiverId}) => {
    const {userLocal} = useAuth();
    const chat = useChat(receiverId, String(userLocal || ''));
    const isSelf = Number(receiverId) === Number(userLocal);
    return <section className="chat-container" aria-label="Conversation">
        <ChatHeader receiverId={receiverId}/>
        <div className={`chat-connection ${chat.connected ? 'is-connected' : ''}`} role="status">
            {chat.connected ? 'Live updates connected' : 'Reconnecting live updates. You can still send a message.'}
        </div>
        <MessageList {...chat} userId={userLocal}/>
        {isSelf ? <p className="chat-error" role="alert">Choose another person to start a conversation.</p> :
            <MessageInput onSendMessage={chat.sendMessage} sending={chat.sending} error={chat.sendError}/>}
    </section>;
};
export default ChatContainer;
