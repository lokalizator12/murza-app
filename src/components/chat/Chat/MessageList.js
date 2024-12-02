import React, {useEffect, useRef} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './MessageList.css';

function parseDate(timestamp) {
    if (Array.isArray(timestamp)) {
        const [year, month, day, hour, minute, second, nanosecond] = timestamp;
        return new Date(
            year,
            month - 1,
            day,
            hour,
            minute,
            second,
            Math.floor(nanosecond / 1e6)
        );
    } else {
        return new Date(timestamp);
    }
}

const MessageList = ({messages, userId, loadMoreMessages, hasMore}) => {
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
            style={{overflow: 'auto', display: 'flex', flexDirection: 'column'}}
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
                            Number(msg.sender.id) === Number(userId) ? 'sent' : 'received'
                        }`}
                    >
                        <p>{msg.content}</p>
                        <div className="message-meta">
                            <span>{parseDate(msg.timestamp).toLocaleString()}</span>
                            {Number(msg.sender.id) === Number(userId) && (
                                <span className="message-status">
                {msg.read ? '✓✓ Read' : '✓ Sent'}
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
