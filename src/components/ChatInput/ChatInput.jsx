
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ChatInput = ({ onSubmitMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmitMessage(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Escribe tu pregunta...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <input type='submit' value='Enviar' />
        </form>
    );
};

ChatInput.propTypes = {
    onSubmitMessage: PropTypes.func.isRequired,
};

export default ChatInput;