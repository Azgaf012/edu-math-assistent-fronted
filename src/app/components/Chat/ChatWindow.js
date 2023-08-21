import React from 'react';
import './ChatWindow.css';  
import SumaLlevando from './AnimatedResponse/SumaLlevando';

const ChatWindow = ({ messages = [] }) => {
  console.log(messages)
  return (
    
    <div className="chat-window">
      
      {messages.map((message, index) => {
        if (message.type === 'sumaLlevando') {
          return <SumaLlevando key={index} content={message.content} data={message.data} />;
        }
        return <div key={index}>{message.content}</div>;
      })}
    </div>
  );
};

export default ChatWindow;
