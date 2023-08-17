import React, { createContext, useContext } from 'react';

import useChatGPT from '../hooks/useChatGPT';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const { messages, sendMessage } = useChatGPT();

  const value = {
    messages,
    sendMessage
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
