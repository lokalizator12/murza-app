// MessageInput.js
import React, {useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const MessageInput = ({onSendMessage}) => {
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            onSendMessage(inputMessage);
            setInputMessage('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="message-input">
            <TextField
                fullWidth
                variant="outlined"
                value={inputMessage}
                onChange={(e) => {
                    setInputMessage(e.target.value);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
            />
            <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon/>
            </IconButton>
        </div>
    );
};

export default MessageInput;
