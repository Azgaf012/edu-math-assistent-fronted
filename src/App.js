import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ChatProvider} from './app/contexts/ChatContext'
import HomePage from './app/pages/HomePage';
import './App.css';

function App() {
  return (
    <ChatProvider>

        <Router>
          <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          </div>
        </Router>

    </ChatProvider>
  );
}

export default App;
