import React, { useState } from 'react';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessage from '../ChatMessage/ChatMessage';
import chatService from '../../services/chatService';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar el spinner de carga

    const addMessage = (message, isUser) => {
        setMessages([...messages, { message, isUser }]);
    };

    const handleSendMessage = async (message) => {
        setIsLoading(true); // Establecer isLoading a true cuando envíe el mensaje
        addMessage(message, true);
    
        const response = await chatService.sendMessage(message);
        setIsLoading(false); // Establecer isLoading a false cuando la respuesta ha llegado
        if (response) {
            addMessage(response.message, false);
        }
    };

    return (
        <div className='chat-window'>
            {messages.map((msg, index) => (
                <ChatMessage
                    key={index}
                    message={msg.message}
                    isUser={msg.isUser}
                />
            ))}
            {/* Mostrar un mensaje de carga o un spinner de carga si isLoading es true */}
            {isLoading && <div className='loading-message'>GPT-4 está pensando...</div>}
            <ChatInput onSubmitMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
