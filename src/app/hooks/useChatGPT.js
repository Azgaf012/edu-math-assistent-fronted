import { useState } from 'react';
import ChatGPTAdapter from '../adapters/ChatGPTAdapter';

const useChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const adapter = new ChatGPTAdapter();

  const sendMessage = async (content) => {
    // Add the user's message to the state
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', content }]);

    // Fetch response from ChatGPT using the adapter
    const response = await adapter.fetchResponse(content);

    // Add the assistant's response to the state
    setMessages((prevMessages) => [...prevMessages, { sender: 'assistant', content: response }]);
  };

  return {
    messages,
    sendMessage
  };
};

export default useChatGPT;
