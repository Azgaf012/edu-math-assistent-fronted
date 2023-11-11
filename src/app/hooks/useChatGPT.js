import { useState } from 'react';
import ChatGPTAdapter from '../adapters/ChatGPTAdapter';
import ResponseContent from '../../core/entities/ResponseContent';

const useChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const adapter = new ChatGPTAdapter();

  const sendMessage = async (content) => {
    
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', content }]);
  
    // Obtener la respuesta de ChatGPT
    const apiResponse = await adapter.fetchResponse(content);
  
    // Aquí, asumimos que apiResponse contiene la información necesaria
    // para crear un objeto ResponseContent
    const responseContent = new ResponseContent(apiResponse.content, apiResponse.data, apiResponse.type);
  
    // Añadir la respuesta del asistente
    setMessages((prevMessages) => [...prevMessages, { sender: 'assistant', content: responseContent }]);
  };
  

  return {
    messages,
    sendMessage
  };
};

export default useChatGPT;
