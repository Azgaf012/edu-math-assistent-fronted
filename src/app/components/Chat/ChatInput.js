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
      position="fixed"
      bottom={0}
      left={0}
      right={0} 
    >
      <TextField
        fullWidth
        variant="outlined"
        value={message}
        bgcolor="#FFF3E0"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu consulta aqui..."
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} style={{marginLeft: '1rem'}}>
        Enviar
      </Button>
    </Box>
  );
};

export default ChatInput;