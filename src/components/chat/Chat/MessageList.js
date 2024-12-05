import React, {useEffect, useRef} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './MessageList.css';

const MessageList = ({messages, userId, loadMoreMessages, hasMore}) => {
    const scrollableDivRef = useRef(null);

    useEffect(() => {
        if (scrollableDivRef.current && messages.length === 20) {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
        }
    }, [messages]);

    const sortedMessages = [...messages].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return (
        <div
            id="scrollableDiv"
            className="message-list"
            ref={scrollableDivRef}
            style={{overflow: 'auto', display: 'flex', flexDirection: 'column-reverse'}}
        >
            <InfiniteScroll
                dataLength={sortedMessages.length}
                next={loadMoreMessages}
                hasMore={hasMore}
                inverse
                loader={<p>Loading...</p>}
                scrollableTarget="scrollableDiv"
            >
                {sortedMessages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`message-item ${msg.senderId === userId ? 'sent' : 'received'}`}
                    >
                        <p>{msg.content}</p>
                        <div className="message-meta">
                            <span>{new Date(msg.timestamp).toLocaleString()}</span>
                            {msg.senderId === userId && (
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
