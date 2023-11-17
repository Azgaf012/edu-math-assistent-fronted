import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send'; // Icono de enviar
import { useChat } from '../../contexts/ChatContext';
import { styled } from '@mui/system';

// Colores y estilos basados en TopicSelection
const primaryColor = '#64b5f6';
const textColor = '#ffffff'; // Color principal para el botón enviar

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px', // Bordes redondeados como en TopicButton
    backgroundColor: '#FFF', // Fondo blanco
    '& fieldset': {
      borderColor: primaryColor, // Borde del color principal
    },
    '&:hover fieldset': {
      borderColor: primaryColor, // Borde del color principal al pasar el mouse
    },
    '&.Mui-focused fieldset': {
      borderColor: primaryColor, // Borde del color principal cuando está enfocado
    },
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px', // Bordes redondeados como en TopicButton
  padding: theme.spacing(2),
  marginLeft: theme.spacing(2),
  backgroundColor: primaryColor, // Fondo del color principal
  color: textColor, // Texto blanco
  '&:hover': {
    backgroundColor: {primaryColor }, // Oscurecer el color al pasar el mouse
    // Eliminar la sombra al pasar el mouse para coincidir con TopicButton
  },
  boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)', // Sombra consistente con TopicButton
}));

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { addMessage } = useChat();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      addMessage(message, 'user');
      setMessage('');
    }
  };

  return (
    <Box 
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      bgcolor="#FFFFFF"
      position="sticky" 
      bottom={0}
      left={0}
      right={0}
    >
      <StyledTextField
        fullWidth
        variant="outlined"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe tu consulta aquí..."
      />
      <StyledButton type="submit" variant="contained" endIcon={<SendIcon />}>
        Enviar
      </StyledButton>
    </Box>
  );
};

export default ChatInput;
