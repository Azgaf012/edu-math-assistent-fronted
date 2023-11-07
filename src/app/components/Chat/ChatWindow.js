import React, { useState, useRef } from 'react';
import { Paper, Box, Typography, IconButton, useMediaQuery } from '@mui/material';
import VolumeUp from '@mui/icons-material/VolumeUp';
import SubtractionProcess from './AnimatedResponse/RetaPrestando';
import Explicacion from './AnimatedResponse/Explicacion';
import SumProcess from './AnimatedResponse/SumaLlevando';
import { useChat } from '../../contexts/ChatContext';
import LoadingMessage from '../common/progress';
import TopicSelection from './TopicSelection';
import parse from 'html-react-parser';
import NumberComparisonProcess from './AnimatedResponse/ComparacionNumeros';
import NumberStepsVisualization from './AnimatedResponse/AnteriorPosterior';

const ChatWindow = ({ messages = [] }) => {

  const isSmallScreen = useMediaQuery(`(max-width:1500px)`);
  const { isLoading } = useChat();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const speakingRef = useRef(false);

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
  };

  const speak = (text) => {
    if (speakingRef.current) {
      window.speechSynthesis.cancel();  // Esto detendrá cualquier habla en curso
      speakingRef.current = false;  // Restablecer la referencia
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
      speakingRef.current = true;  // Indicar que la síntesis de voz está en curso
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? 'column' : 'row'} // Ajuste de dirección basado en el tamaño de pantalla
      width="100%"
      height="90vh"
      p={0}
      position="relative"
    >
      <Box
        flex={selectedTopic ? '1' : '4'} // Esto permite que el Box se ajuste según el contenido
        width={isSmallScreen ? '100%' : '50%'} // Ajusta el ancho al 100% en pantallas pequeñas
        bgcolor="#FFEBEE"
        p={2}
        overflow="auto"
        position="relative"
        transition="flex 0.5s ease-in-out"
        order={isSmallScreen && selectedTopic ? 2 : 1} // Ajuste del orden en pantallas pequeñas
      >
        <TopicSelection onTopicSelect={handleTopicSelection} isTopicSelected={!!selectedTopic} />
      </Box>

      <Box
        flex={selectedTopic ? 3 : 0}
        bgcolor="#E0F2F1"
        p={4}
        overflow="auto"
        position="relative"
        transition="flex 0.5s ease-in-out"
        order={isSmallScreen ? 1 : 2} // Ajuste del orden para que el contenido se muestre primero en pantallas pequeñas
        display={selectedTopic || isSmallScreen ? 'block' : 'none'} // Ocultar este Box si no hay un tema seleccionado en pantallas grandes
      >
        {messages.map((message, index) => {

          if (message.content?.response?.type === 'sumaLlevando') {
            return (
              <Explicacion key={index} content={message.content.response.content} >
                <SumProcess content={message.content.response.content} data={message.content.response.data} />
              </Explicacion>
            );
          }

          if (message.content?.response?.type === 'restaPrestando') {
            return (
              <Explicacion key={index} content={message.content.response.content}>
                <SubtractionProcess content={message.content.response.content} data={message.content.response.data} />
              </Explicacion>
            );
          }

          if (message.content?.response?.type === 'comparacionNumeros') {
            return (
              <Explicacion key={index} content={message.content.response.content}>
                <NumberComparisonProcess content={message.content.response.content} data={message.content.response.data} />
              </Explicacion>
            );
          }

          if (message.content?.response?.type === 'anteriorPosterior') {
            return (
              <Explicacion key={index} content={message.content.response.content}>
                <NumberStepsVisualization content={message.content.response.content} data={message.content.response.data} />
              </Explicacion>
            );
          }

          const alignment = message.sender === 'user' ? 'flex-start' : 'flex-end';

          return (
            <Box key={index} display="flex" justifyContent={alignment} marginBottom={2} >
              <Paper elevation={3} style={{ padding: '1rem', maxWidth: '70%' }}>
                <Typography variant="body1">{parse(message.content)}</Typography>
              </Paper>
              <IconButton onClick={() => speak(message.content)}>
                <VolumeUp />
              </IconButton>
            </Box>
          );
        })}
        {isLoading && <LoadingMessage />}
      </Box>
    </Box>
  );
};

export default ChatWindow;
