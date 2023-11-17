import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useChat } from '../../contexts/ChatContext';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { addMessage } = useChat();
  
  const handleSubmit = () => {
    if (message.trim()) {  
      addMessage(message, 'user');  
      setMessage('');  
    }
  };

  return (
    <Box 
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      bgcolor="#FFFFFF"
      position="sticky" 
      maxHeight={30}// Cambio a posicionamiento sticky
      bottom={0}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu consulta aquí..."
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Enviar
      </Button>
    </Box>
  );
};

export default ChatInput;