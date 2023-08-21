import React, { createContext, useContext, useState } from 'react';
import ChatGPTAdapter from "../adapters/ChatGPTAdapter";
const chatAdapter = new ChatGPTAdapter();

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = async(content, sender) => {
    const newMessage = { content, sender };
    setMessages(prevMessages => [...prevMessages, newMessage]);

    // Si el mensaje es del usuario, obten la respuesta de ChatGPT
    if (sender === 'user') {
      const responseContent = await chatAdapter.fetchResponse(content);
      const responseMessage = { content: responseContent, sender: 'assistant' };
      setMessages(prevMessages => [...prevMessages, newMessage, responseMessage]);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
