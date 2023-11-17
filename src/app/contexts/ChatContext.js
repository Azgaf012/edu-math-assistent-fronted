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
    setMessages(prevMessages => [...prevMessages, newMessage]);
    if (sender === 'user') {
      setIsLoading(true);
      try {
        const apiResponse = await chatAdapter.fetchResponse(content);
        setIsLoading(false);
        
        let responseMessage;
        if (apiResponse.response === undefined) {
          responseMessage = apiResponse;
        } else {
          responseMessage = new ChatMessage('assistant', apiResponse.response, new Date().toISOString());
        }
  
        // Now add assistant's response
        setMessages(prevMessages => [...prevMessages, responseMessage]);
  
      } catch (error) {
        console.error('Error while fetching response:', error);
        setIsLoading(false);
        // Handle error by adding a message indicating the error
        setMessages(prevMessages => [...prevMessages, new ChatMessage('assistant', 'Lo siento, hubo un error al procesar tu solicitud.', new Date().toISOString())]);
      }
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
