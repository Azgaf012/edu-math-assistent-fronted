import React from 'react';
import { Button, Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import { useChat } from '../../contexts/ChatContext';

const TopicSelection = ({ onTopicSelect }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { addMessage } = useChat();

  const handleButtonClick = (topic) => {
    addMessage(topic, 'user');  // Envía el mensaje al backend cuando se hace clic en un botón
    onTopicSelect(topic);  // Esta línea ya estaba aquí
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      p={2}
    >
      <Typography variant="h2" gutterBottom>
        Smart Tutor
      </Typography>
      <Typography variant="h5" gutterBottom color="textSecondary">
        ¡Descubre lo divertido que son las matemáticas!
      </Typography>
      <Typography variant="subtitle1" gutterBottom textAlign="center" mb={4}>
        Explora, aprende y diviértete con las sumas y restas. Escoge un tema y comienza tu aventura matemática.
      </Typography>
      <Box
        display="flex"
        flexDirection={isSmallScreen ? 'column' : 'row'}
        justifyContent="space-around"
        width="100%"
        mt={2}
      >
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<AddBoxIcon />}
          onClick={() => handleButtonClick('Sumas Llevando')}
        >
          Sumas Llevando
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<IndeterminateCheckBoxIcon />}
          onClick={() => handleButtonClick('Restas Prestando')}
        >
          Restas Prestando
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<IndeterminateCheckBoxIcon />}
          onClick={() => handleButtonClick('Comparacion de numeros')}
        >
          Comparaci&oacute;n de n&uacute;meros
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          startIcon={<IndeterminateCheckBoxIcon />}
          onClick={() => handleButtonClick('Posterior y anterior')}
        >
          Anterior y posterior
        </Button>
      </Box>
    </Box>
  );
};

export default TopicSelection;
