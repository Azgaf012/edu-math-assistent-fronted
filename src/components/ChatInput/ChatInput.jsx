import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import 'emoji-mart';
import './ChatInput.css';

const ChatInput = ({ onSubmitMessage }) => {
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmitMessage(message);
        setMessage('');
    };

    const addEmoji = (e) => {
        let emoji = e.native;
        setMessage(message + emoji);
    };

    return (
        <form onSubmit={handleSubmit} className="chat-input">
            <textarea
                placeholder='Escribe tu pregunta...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="chat-textarea"
            />
            <div className="buttons">
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="emoji-button"
                >
                    😀
                </button>
                {showEmojiPicker && <Picker onSelect={addEmoji} />}
                <input type='submit' value='Enviar' className="submit-button"/>
            </div>
        </form>
    );
};

ChatInput.propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
};

export default ChatInput;
