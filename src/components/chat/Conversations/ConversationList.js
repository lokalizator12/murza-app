import React, {useCallback, useEffect, useState} from 'react';
import axios from '../../../axiosConfig';
import {Link} from 'react-router-dom';
import {createChatClient} from '../../../services/chatClient';
import {messageDate} from '../../../services/chatMessages';

const ConversationList = ({activeId}) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [attempt, setAttempt] = useState(0);
    const updateUnreadCount = useCallback(items => {
        const count = items.reduce((total, item) => total + (Number(item.interlocutorId) === Number(activeId) ? 0 : Number(item.unreadMessages) || 0), 0);
        localStorage.setItem('currentCountMessages', String(count));
        window.dispatchEvent(new Event('storage'));
    }, [activeId]);
    useEffect(() => {
        let active = true;
        let version = 0;
        const load = async () => {
            const request = ++version;
            try {
                const {data} = await axios.get('/conversations');
                if (active && request === version) { setConversations(data); updateUnreadCount(data); setError(''); }
            } catch { if (active && request === version) setError('Conversations could not be loaded. Try again.'); }
            finally { if (active && request === version) setLoading(false); }
        };
        setLoading(true);
        load();
        const connection = createChatClient({onConnect: () => {
            connection.subscribe('/user/queue/messages', load);
            load();
        }});
        connection.activate();
        window.addEventListener('murza:conversations-changed', load);
        return () => { active = false; connection.deactivate(); window.removeEventListener('murza:conversations-changed', load); };
    }, [updateUnreadCount, attempt]);
    const filtered = conversations.filter(item => String(item.interlocutorName || '').toLowerCase().includes(query.toLowerCase()));
    return <aside className="conversation-list" aria-label="Conversations">
        <h2>Your conversations</h2>
        <label className="conversation-search">Find a person<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search by name"/></label>
        {loading && <p role="status">Loading conversations…</p>}
        {error && <div className="chat-error" role="alert"><p>{error}</p><button onClick={() => setAttempt(value => value + 1)}>Try again</button></div>}
        {!loading && !error && !conversations.length && <p className="conversation-empty">No conversations yet. Open a parcel or trip and choose “Message sender” or “Message traveller”.</p>}
        {!loading && !error && conversations.length > 0 && !filtered.length && <p>No people match this name.</p>}
        <ul>{filtered.map(item => {
            const selected = String(item.interlocutorId) === String(activeId);
            const date = messageDate(item.lastMessageTimestamp);
            return <li key={item.interlocutorId}><Link to={`/chat/${item.interlocutorId}`} className={`conversation-item ${selected ? 'is-active' : ''}`} aria-current={selected ? 'page' : undefined}>
                {item.interlocutorPhoto ? <img src={item.interlocutorPhoto} alt="" className="chat-avatar"/> : <span className="chat-avatar" aria-hidden="true">{(item.interlocutorName || 'M').charAt(0)}</span>}
                <span className="conversation-details"><strong>{item.interlocutorName || 'Murza member'}</strong><span>{item.lastMessage || 'Start a conversation'}</span></span>
                <span className="conversation-meta">{!Number.isNaN(date.getTime()) && <time>{date.toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</time>}
                {!selected && item.unreadMessages > 0 && <span className="conversation-unread" aria-label={`${item.unreadMessages} unread messages`}>{item.unreadMessages}</span>}</span>
            </Link></li>;
        })}</ul>
    </aside>;
};
export default ConversationList;
