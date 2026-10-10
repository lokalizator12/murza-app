import React, {useEffect, useRef} from 'react';
import {messageDate} from '../../../services/chatMessages';

const MessageList = ({messages, userId, loadMoreMessages, hasMore, loading, historyError, retryHistory}) => {
    const scroll = useRef(null);
    const previous = useRef([]);
    const earlierHeight = useRef(null);
    const nearBottom = useRef(true);
    useEffect(() => {
        const element = scroll.current;
        if (!element || typeof ResizeObserver === 'undefined') return;
        const observer = new ResizeObserver(() => {
            if (nearBottom.current) element.scrollTop = element.scrollHeight;
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);
    useEffect(() => {
        const element = scroll.current;
        if (!element) return;
        const old = previous.current;
        const tail = messages[messages.length - 1];
        if (earlierHeight.current !== null && messages.length > old.length && tail?.id === old[old.length - 1]?.id) {
            element.scrollTop += element.scrollHeight - earlierHeight.current;
            earlierHeight.current = null;
        } else if (!old.length || tail?.id !== old[old.length - 1]?.id) {
            if (!old.length || nearBottom.current || Number(tail?.senderId) === Number(userId)) element.scrollTop = element.scrollHeight;
        }
        previous.current = messages;
    }, [messages, userId]);
    return <div className="message-list" ref={scroll} onScroll={() => { const element = scroll.current; nearBottom.current = element.scrollHeight - element.scrollTop - element.clientHeight < 100; }} aria-label="Message history" tabIndex={0}>
        {hasMore && <button className="chat-load-more" disabled={loading} onClick={() => {
            earlierHeight.current = scroll.current.scrollHeight; loadMoreMessages();
        }}>{loading ? 'Loading earlier messages…' : 'Load earlier messages'}</button>}
        {loading && !messages.length && <p role="status">Loading messages…</p>}
        {historyError && <div className="chat-error" role="alert"><p>{historyError}</p><button onClick={retryHistory}>Try again</button></div>}
        {!loading && !historyError && !messages.length && <div className="chat-empty-thread"><h3>Introduce yourself</h3><p>Share your route and preferred dates. Confirm the parcel size, price and handover details together.</p></div>}
        {messages.map(message => {
            const own = Number(message.senderId) === Number(userId);
            const date = messageDate(message.timestamp);
            return <article key={message.id} className={`message-item ${own ? 'sent' : 'received'}`}>
                <p>{message.content}</p><div className="message-meta">
                    <time dateTime={Number.isNaN(date.getTime()) ? undefined : date.toISOString()}>{Number.isNaN(date.getTime()) ? '' : date.toLocaleString(undefined, {month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'})}</time>
                    {own && <span>{message.status === 'READ' ? 'Read' : 'Sent'}</span>}
                </div>
            </article>;
        })}
    </div>;
};
export default MessageList;
