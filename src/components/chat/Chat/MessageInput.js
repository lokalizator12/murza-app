import React, {useState} from 'react';
import {IconButton, Popover, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Picker from 'emoji-picker-react';
import './MessageInput.css';

const MessageInput = ({onSendMessage}) => {
    const [inputMessage, setInputMessage] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            onSendMessage(inputMessage); // Send the message to the parent component
            setInputMessage(''); // Clear the input field
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleEmojiClick = (emojiData) => {
        // Append the selected emoji to the message
        setInputMessage((prev) => prev + emojiData.emoji);
        setAnchorEl(null); // Close the emoji picker
    };

    const openEmojiPicker = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const closeEmojiPicker = () => {
        setAnchorEl(null);
    };

    return (
        <div className="message-input">
            <TextField
                fullWidth
                variant="outlined"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message"
            />
            <IconButton color="primary" onClick={openEmojiPicker}>
                <EmojiEmotionsIcon/>
            </IconButton>
            <IconButton color="primary" onClick={handleSendMessage}>
                <SendIcon/>
            </IconButton>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={closeEmojiPicker}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Picker onEmojiClick={handleEmojiClick}/>
            </Popover>
        </div>
    );
};

export default MessageInput;
