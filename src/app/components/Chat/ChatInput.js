import React, { useState } from 'react';
import Button from '../common/Button';

const ChatInput = ({ onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    onSubmit(message);
    setMessage('');  // Clear the input after submitting.
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <Button label="Send" onClick={handleSubmit} />
    </div>
  );
};

export default ChatInput;
