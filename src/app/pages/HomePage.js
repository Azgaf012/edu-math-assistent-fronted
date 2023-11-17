import React from 'react';
import ChatWindow from '../components/Chat/ChatWindow';
import { ChatProvider, useChat } from '../contexts/ChatContext';
import ChatInput from '../components/Chat/ChatInput';
import TopicSelection from '../components/Chat/TopicSelection';
import { Box } from '@mui/material';

const HomePage = () => {
  return (
    <div className="home-page">
      <ChatProvider>
        <Box display="flex" height="100vh"> {/* Establece la altura máxima de la vista */}
          <Box width="25%" bgcolor="#FFEBEE" overflow="auto"> {/* Permite scroll solo si es necesario */}
            <TopicSelection />
          </Box>
          <Box width="75%" display="flex" flexDirection="column"> {/* Usa flex column para ChatBox */}
            <ChatBox />
          </Box>
        </Box>
      </ChatProvider>
    </div>
  );
};

const ChatBox = () => {
  const { messages } = useChat();

  return (
    <Box flex={1} display="flex" flexDirection="column" height="100vh"> {/* Establece la altura máxima de la vista */}
      <ChatWindow messages={messages} />
      <ChatInput />
    </Box>
  );
}

export default HomePage;
