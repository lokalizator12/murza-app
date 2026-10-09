import React from 'react';
import {Link, useParams} from 'react-router-dom';
import ChatContainer from './Chat/ChatContainer';
import ConversationList from './Conversations/ConversationList';
import './Chat.css';

const ChatPage = () => {
    const {userId} = useParams();
    return <main className="murza-messages">
        <div className="messages-heading"><div><h1>Messages</h1><p>Agree on the details before handing over a parcel.</p></div><Link to="/main?type=trip">Find a trip</Link></div>
        <div className={`chat-page ${userId ? 'has-conversation' : ''}`}>
            <ConversationList activeId={userId}/>
            {userId ? <ChatContainer key={userId} receiverId={userId}/> : <section className="chat-placeholder">
                <img src="/images/murza-mascot.webp" alt=""/>
                <h2>Your next delivery starts with a conversation</h2>
                <p>Choose a message on the left, or find a parcel or trip and contact its owner.</p>
                <Link className="murza-button" to="/main?type=parcel">Find a parcel</Link>
            </section>}
        </div>
    </main>;
};
export default ChatPage;
