import React from 'react';
import ChatWindow from '../components/Chat/ChatWindow';
import { ChatProvider, useChat } from '../contexts/ChatContext';
import ChatInput from '../components/Chat/ChatInput';

const HomePage = () => {
  return (
    <div className="home-page">
      <ChatProvider>
        <ChatBox />
      </ChatProvider>
    </div>
  );
};

const ChatBox = () => {
  const { messages } = useChat();
  return (
    <>
      <ChatWindow messages={messages}/>
      <ChatInput />
    </>
  );
}

export default HomePage;
