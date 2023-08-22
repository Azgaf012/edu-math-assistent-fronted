import React, { useState } from 'react';
import Button from '../common/Button';
import { useChat } from '../../contexts/ChatContext';
import './ChatInput.css'

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');
  const { addMessage } = useChat();  // Utiliza el hook

  const handleSubmit = () => {
    if (message.trim()) {  // Evita enviar mensajes vacíos
      addMessage(message, 'user');  // Añade el mensaje como un mensaje del usuario
      setMessage('');  // Limpia el input después de enviar.
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu consulta aqui..."
      />
      <Button label="Enviar" onClick={handleSubmit} />
    </div>
  );
};

export default ChatInput;
