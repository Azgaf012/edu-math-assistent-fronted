import React, { useState } from 'react';
import { Paper, Box, Typography } from '@mui/material';
import SubtractionProcess from './AnimatedResponse/RetaPrestando';
import Explicacion from './AnimatedResponse/Explicacion';
import SumProcess from './AnimatedResponse/SumaLlevando';
import { useChat } from '../../contexts/ChatContext';
import LoadingMessage from '../common/progress';
import TopicSelection from './TopicSelection';

const ChatWindow = ({ messages = [] }) => {
  const { isLoading } = useChat();
  const [selectedTopic, setSelectedTopic] = useState(null);
  console.log(messages);
  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <Box
      display="flex"
      width="100%"

      height="90vh"
      p={0}
      position="relative"
    >
      <Box
        flex={selectedTopic ? 1 : 4}  // Ajusta el flex basado en si hay un tema seleccionado
        width="100%"
        bgcolor="#FFEBEE"
        p={2}
        overflow="auto"
        position="relative"
        transition="flex 0.5s ease-in-out"
      >
        <TopicSelection onTopicSelect={handleTopicSelection} />
      </Box>

      <Box
        flex={selectedTopic ? 3 : 0}  
        bgcolor="#E0F2F1"
        p={4}
        overflow="auto"
        position="relative"  
        transition="left 0.5s ease-in-out"
        
      >
        {messages.map((message, index) => {
          
          if (message.content?.response?.type === 'sumaLlevando') {
            return (
              <Explicacion key={index} content={message.content.response.content} data={message.content.response.data} >
                <SumProcess  content={message.content.response.content} data={message.content.response.data} />
              </Explicacion>
            );
          }

          if (message.content?.response?.type === 'restaPrestando') {
            return (
              <Explicacion key={index} content={message.content.response.content} data={message.content.response.data}>
                <SubtractionProcess content={message.content.response.content} data={message.content.response.data} />
              </Explicacion>
            );
          }

          const alignment = message.sender === 'user' ? 'flex-start' : 'flex-end';

          return (
            <Box key={index} display="flex" justifyContent={alignment} marginBottom={2} >
              <Paper elevation={3} style={{ padding: '1rem', maxWidth: '70%' }}>
                <Typography variant="body1">{message.content}</Typography>
              </Paper>
            </Box>
          );
        })}
        {isLoading && <LoadingMessage />}
      </Box>
    </Box>
  );
};

export default ChatWindow;
