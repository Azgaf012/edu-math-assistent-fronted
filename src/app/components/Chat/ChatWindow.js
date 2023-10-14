import React from 'react';
import './ChatWindow.css';  
import SumaLlevando from './AnimatedResponse/SumaLlevando';
import RestaPrestando from './AnimatedResponse/RetaPrestando';

const ChatWindow = ({ messages = [] }) => {
  console.log(messages)
  return (
    
    <div className="chat-window">
      
      {messages.map((message, index) => {
        if (message.content?.response?.type === 'sumaLlevando') {
          console.log(message)
          return <SumaLlevando key={index} className="message assistant" content={message.content.response.content} data={message.content.response.data} />;
        }
        if (message.content?.response?.type === 'restaPrestando') {
          console.log(message)
          return <RestaPrestando key={index} className="message assistant" content={message.content.response.content} data={message.content.response.data} />;
        }
        return <div key={index} className="message assistant">{message.content}</div>;
      })}
    </div>
  );
};

export default ChatWindow;
