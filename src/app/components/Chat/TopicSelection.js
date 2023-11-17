import React from 'react';
import { Button, Box, useMediaQuery, Typography } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import PatternIcon from '@mui/icons-material/Pattern';
import { useChat } from '../../contexts/ChatContext';
import { styled } from '@mui/system';

// Colores de texto para contraste
const textColor = '#ffffff';

const StyledButton = styled(Button)(({ color }) => ({
  padding: '10px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'none',
  borderRadius: '20px',
  margin: '8px',
  color: textColor,
  backgroundColor: color, // Usa el color proporcionado
  '&:hover': {
    // Aumenta la oscuridad del color al pasar el mouse
    backgroundColor: color, // Aquí podrías oscurecer el color al pasar el mouse
    boxShadow: '0 4px 12px 0 rgba(0,0,0,0.2)',
  },
}));


const useIsSmallScreen = () => {
  return useMediaQuery('(max-width:900px)');
};

// Lista completa de temas con íconos y colores personalizados
const topics = [
  { name: 'Sumas Llevando', icon: <AddBoxIcon />, color: '#f06292' },
  { name: 'Restas Prestando', icon: <IndeterminateCheckBoxIcon />, color: '#ba68c8' },
  { name: 'Comparación de Números', icon: <CompareArrowsIcon />, color: '#64b5f6' },
  { name: 'Anterior y Posterior', icon: <ArrowBackIcon />, color: '#4db6ac' },
  { name: 'Descomposición de Números', icon: <FilterNoneIcon />, color: '#ffa500' },
  { name: 'Patrones Numéricos', icon: <PatternIcon />, color: '#ff8a65' },
];

const TopicButton = ({ topic, onTopicSelect, isFullWidth }) => {
  const { addMessage } = useChat();

  const handleButtonClick = () => {
    addMessage(topic.name, 'user');
    onTopicSelect(topic.name);
  };

  return (
    <StyledButton
      variant="contained"
      size="large"
      startIcon={topic.icon}
      onClick={handleButtonClick}
      fullWidth={isFullWidth}
      style={{ backgroundColor: topic.color, color: textColor }} // Estilos directos para el color de fondo y de texto
    >
      {topic.name}
    </StyledButton>
  );
};



const TopicSelection = ({ onTopicSelect }) => {
  const isSmallScreen = useIsSmallScreen();

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
        justifyContent="center"
        alignItems="stretch"
        width="100%"
        mt={2}
        gap={2}
      >
        {topics.map((topic) => (
          <TopicButton
            key={topic.name}
            topic={topic}
            onTopicSelect={onTopicSelect}
            isFullWidth={isSmallScreen}
          />
        ))}
      </Box>
    </Box>
  );
};

export default TopicSelection;
