import React, { createContext, useContext, useState } from 'react';
import ChatGPTAdapter from "../adapters/ChatGPTAdapter";
import ChatMessage from '../../core/entities/ChatMessage';

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
      const apiResponse = await chatAdapter.fetchResponse(content);
      setIsLoading(false);
      console.log(apiResponse);
      const responseMessage = new ChatMessage(
          'assistant',
          apiResponse.response,
          new Date().toISOString()
      );

      //validar si apiResponse es un json o un string
        (apiResponse.response === undefined)?
        setMessages(prevMessages => [...prevMessages, apiResponse, newMessage]):
        setMessages(prevMessages => [...prevMessages, responseMessage, newMessage]);
        
       
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
