import React from 'react';
import PropTypes from 'prop-types';
import './ChatMessage.css';

const ChatMessage = ({ message, isUser }) => (
    <div className={isUser ? 'user-message' : 'bot-message'}>
        <p>{message}</p>
    </div>
);

ChatMessage.propTypes = {
    message: PropTypes.string.isRequired,
    isUser: PropTypes.bool.isRequired,
};

export default ChatMessage;