import React, {useRef, useState} from 'react';

const MessageInput = ({onSendMessage, sending = false, error = ''}) => {
    const [text, setText] = useState('');
    const inFlight = useRef(false);
    const send = async event => {
        event?.preventDefault();
        if (!text.trim() || sending || inFlight.current) return;
        inFlight.current = true;
        try { if (await onSendMessage(text)) setText(''); } finally { inFlight.current = false; }
    };
    return <form className="message-input" onSubmit={send}>
        {error && <p className="chat-error" role="alert">{error}</p>}
        <label htmlFor="chat-message">Message</label>
        <textarea id="chat-message" value={text} maxLength={2000} rows={2} disabled={sending}
            placeholder="Ask about pickup, delivery or available space…"
            onChange={event => setText(event.target.value)}
            onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) send(event); }}
            aria-describedby="message-help"/>
        <div className="message-compose-footer"><span id="message-help">Enter to send. Shift + Enter for a new line. {text.length}/2,000</span>
            <button className="murza-button murza-button-small" type="submit" disabled={!text.trim() || sending}>
                {sending ? 'Sending…' : 'Send message'}
            </button></div>
    </form>;
};
export default MessageInput;
