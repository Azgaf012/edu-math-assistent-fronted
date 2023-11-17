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
import ResponseContent from '../../../core/entities/ResponseContent';
import FunNumberDecomposition from './AnimatedResponse/DescomposicionNumeros';
import NumberPatternsComponent from './AnimatedResponse/PatronesNumericos';

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
      window.speechSynthesis.cancel();
      speakingRef.current = false;
    } else {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
      speakingRef.current = true;
    }
  };

  return (
    <Box
      display="flex"
      flexDirection={isSmallScreen ? 'column' : 'row'}
      width="100%"
      height="90vh"
      p={0}
      position="relative"
    >
      <Box
        flex={selectedTopic ? '2' : '4'}
        width={isSmallScreen ? '100%' : '50%'}
        bgcolor="#FFEBEE"
        p={2}
        overflow="auto"
        position="relative"
        transition="flex 0.5s ease-in-out"
        order={isSmallScreen && selectedTopic ? 2 : 1}
      >
        <TopicSelection onTopicSelect={handleTopicSelection} isTopicSelected={!!selectedTopic} />
      </Box>

      <Box
        flex={selectedTopic ? 4 : 0}
        bgcolor="#E0F2F1"
        p={4}
        overflow="auto"
        position="relative"
        transition="flex 0.5s ease-in-out"
        order={isSmallScreen ? 1 : 2} 
        display={selectedTopic || isSmallScreen ? 'block' : 'none'} 
      >
        {messages.map((message, index) => {
          const { responseMessage, sender, content } = message;

          let textToSpeak= content;
          if(content === undefined){

            textToSpeak = message;
          } 
          
          if(sender === 'assistant' && typeof responseMessage === 'object' && responseMessage !== null){
          
            const { content, data, type } = responseMessage;
          
            const answerContent = new ResponseContent(content, data, type);
            
            if (answerContent.type === 'sumaLlevando') {
              console.log(answerContent);
              return (
                <Explicacion key={index} content={answerContent.content} >
                  <SumProcess content={answerContent.content.ejemplo.pasos} data={answerContent.data} />
                </Explicacion>
              );
            }

            if (answerContent.type === 'restaPrestando') {
              return (
                <Explicacion key={index} content={answerContent.content}>
                  <SubtractionProcess content={answerContent.content.ejemplo.pasos} data={answerContent.data} />
                </Explicacion>
              );
            }

            if (answerContent.type === 'comparacionNumeros') {
              return (
                <Explicacion key={index} content={answerContent.content}>
                  <NumberComparisonProcess content={answerContent.content.ejemplo.pasos} data={answerContent.data} />
                </Explicacion>
              );
            }

            if (answerContent.type === 'anteriorPosterior') {
              return (
                <Explicacion key={index} content={answerContent.content}>
                  <NumberStepsVisualization content={answerContent.content.ejemplo.pasos} data={answerContent.data} />
                </Explicacion>
              );
            }

            if (answerContent.type === 'descomposicionNumeros') {
              return (
                <Box key={index} sx={{ my: 2 }}>
                  <Explicacion content={answerContent.content}>
                    <FunNumberDecomposition 
                      hundreds={answerContent.data.hundreds} 
                      tens={answerContent.data.tens} 
                      ones={answerContent.data.ones} 
                      steps={answerContent.content.ejemplo.pasos}
                    />
                  </Explicacion>
                </Box>
              );
            }

            if (answerContent.type === 'patronesNumericos') {
              return (
                <Explicacion key={index} content={answerContent.content}>
                  <NumberPatternsComponent content={answerContent.content.ejemplo.pasos} data={answerContent.data} />
                </Explicacion>
              );
            }
            

            textToSpeak = answerContent.saludo + " " + answerContent.tema;
          }
          
          const alignment = sender === 'user' ? 'flex-start' : 'flex-end';

          return (
            <Box key={index} display="flex" justifyContent={alignment} marginBottom={2} >
              <Paper elevation={3} style={{ padding: '1rem', maxWidth: '70%' }}>
                <Typography variant="body1">{textToSpeak}</Typography>
              </Paper>
              <IconButton onClick={() => speak(textToSpeak)}>
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
