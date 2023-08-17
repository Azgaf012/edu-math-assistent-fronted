import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ChatProvider} from './app/contexts/ChatContext'
import { GameProvider } from './app/contexts/GameContext';
import HomePage from './app/pages/HomePage';
import GamePage from './app/pages/GamePage';
import './App.css'; // Asumiendo que tienes estilos globales en App.css

function App() {
  return (
    <ChatProvider>
      <GameProvider>
        <Router>
          <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            {/* Puedes agregar más rutas según sea necesario */}
          </Routes>
          </div>
        </Router>
      </GameProvider>
    </ChatProvider>
  );
}

export default App;
