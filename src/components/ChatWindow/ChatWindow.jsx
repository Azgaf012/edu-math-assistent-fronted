
import './ChatWindow.css';

import React, { useState } from 'react';
import ChatInput from '../ChatInput/ChatInput';
import ChatMessage from '../ChatMessage/ChatMessage';
import chatService from '../../services/chatService';

// Importar el SVG como un componente React
import { ReactComponent as CharacterListening } from '../../images/character-listening.svg';
import { ReactComponent as CharacterThinking } from '../../images/character-thinking.svg';
import { ReactComponent as CharacterResponding } from '../../images/character-responding.svg';

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [characterState, setCharacterState] = useState('listening'); // nuevo estado para seguir el estado del personaje

    const addMessage = (message, isUser) => {
        setMessages([...messages, { message, isUser }]);
    };

    const handleSendMessage = async (message) => {
        setIsLoading(true);
        setCharacterState('thinking'); // cambiar el estado del personaje a 'pensando'
        addMessage(message, true);
    
        const response = await chatService.sendMessage(message);
        setIsLoading(false);
        setCharacterState('responding'); // cambiar el estado del personaje a 'respondiendo'
        if (response) {
            addMessage(response.message, false);
        }
    };

    const renderCharacter = () => {
        switch (characterState) {
            case 'thinking':
                return <CharacterThinking className="character" />
            case 'responding':
                return <CharacterResponding className="character" />
            case 'listening':
            default:
                return <CharacterListening className="character" />
        }
    };

    return (
        <div className='chat-window'>
            {renderCharacter()} {/* Renderizar el SVG como un componente */}
            {messages.map((msg, index) => (
                <ChatMessage
                    key={index}
                    message={msg.message}
                    isUser={msg.isUser}
                />
            ))}
            {isLoading && <div className='loading-message'>GPT-4 está pensando...</div>}
            <ChatInput onSubmitMessage={handleSendMessage} />
        </div>
    );
};

export default ChatWindow;
