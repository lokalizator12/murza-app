// MessageList.js
import React, { useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './MessageList.css';

function parseDate(timestamp) {
    return new Date(timestamp);
}

const MessageList = ({ messages, userId, loadMoreMessages, hasMore }) => {
    const scrollableDivRef = useRef(null);

    useEffect(() => {
        if (scrollableDivRef.current) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [messages]);

    const sortedMessages = [...messages].sort((a, b) => {
        const dateA = parseDate(a.timestamp);
        const dateB = parseDate(b.timestamp);
        return dateA - dateB;
    });

    return (
        <div
            id="scrollableDiv"
            className="message-list"
            ref={scrollableDivRef}
            style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}
        >
            <InfiniteScroll
                dataLength={sortedMessages.length}
                next={loadMoreMessages}
                hasMore={hasMore}
                inverse={false}
                loader={null}
                scrollableTarget="scrollableDiv"
            >
                {sortedMessages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message-item ${
                            Number(msg.senderId) === Number(userId) ? 'sent' : 'received'
                        }`}
                    >
                        <p>{msg.content}</p>
                        <div className="message-meta">
                            <span>{parseDate(msg.timestamp).toLocaleString()}</span>
                            {Number(msg.senderId) === Number(userId) && (
                                <span className="message-status">
                  {msg.status === 'READ' ? '✓✓ Read' : '✓ Sent'}
                </span>
                            )}
                        </div>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};

export default MessageList;
