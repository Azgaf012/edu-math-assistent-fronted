import React, { useState } from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow/ChatWindow';
import ResponseWindow from './components/ResponseWindow/ResponseWindow';

function App() {
  const [responses, setResponses] = useState([]);

  const handleResponse = (response) => {
    setResponses([...responses, response]);
  };

  return (
    <div className="App">
      <ChatWindow onResponse={handleResponse} />
      <ResponseWindow responses={responses} />
    </div>
  );
}

export default App;
