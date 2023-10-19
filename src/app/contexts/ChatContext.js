import React, { createContext, useContext, useState } from 'react';
import ChatGPTAdapter from "../adapters/ChatGPTAdapter";
const chatAdapter = new ChatGPTAdapter();

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 

  const addMessage = async(content, sender) => {
    setMessages([]);
    const newMessage = { content, sender };
  
    if (sender === 'user') {
      setIsLoading(true); 
      
      const responseContent = await chatAdapter.fetchResponse(content);
      setIsLoading(false);

      const responseMessage = { content: responseContent, sender: 'assistant' };
      setMessages(prevMessages => [...prevMessages, newMessage, responseMessage]);
    } else {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
};


export const useChat = () => {
  return useContext(ChatContext);
};
