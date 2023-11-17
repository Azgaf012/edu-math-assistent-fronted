import React, { useRef } from 'react';
import { Paper, Box, Typography, IconButton } from '@mui/material';
import VolumeUp from '@mui/icons-material/VolumeUp';
import SubtractionProcess from './AnimatedResponse/RetaPrestando';
import Explicacion from './AnimatedResponse/Explicacion';
import SumProcess from './AnimatedResponse/SumaLlevando';
import { useChat } from '../../contexts/ChatContext';
import LoadingMessage from '../common/progress';
import NumberComparisonProcess from './AnimatedResponse/ComparacionNumeros';
import NumberStepsVisualization from './AnimatedResponse/AnteriorPosterior';
import ResponseContent from '../../../core/entities/ResponseContent';
import FunNumberDecomposition from './AnimatedResponse/DescomposicionNumeros';
import NumberPatternsComponent from './AnimatedResponse/PatronesNumericos';

const ChatWindow = ({ messages = [] }) => {

  const { isLoading } = useChat();
  const speakingRef = useRef(false);

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
        flex={1}
        bgcolor="#E0F2F1"
        p={4}
        overflow="auto"
        position="relative"
        sx={{ height: '90vh' }}
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

            textToSpeak = answerContent.content.audio;
            
            if (answerContent.type === 'sumaLlevando') {
              return (
                
                <Explicacion key={index} content={answerContent.content} >
                  <IconButton onClick={() => speak(textToSpeak)}>
                    <VolumeUp />
                  </IconButton>
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
                  <IconButton onClick={() => speak(textToSpeak)}>
                    <VolumeUp />
                  </IconButton>
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
    
  );
};

export default ChatWindow;
