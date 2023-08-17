import React, { useState } from 'react';
import MathGame from '../components/Games/MathGame';

const GamePage = () => {
  const [currentGame, setCurrentGame] = useState(null);

  return (
    <div className="game-page">
      <h1>Elige un juego</h1>
      <button onClick={() => setCurrentGame('math')}>Juego de Matemáticas</button>
      
      {currentGame === 'math' && <MathGame />}
      {/* You can add more games as needed */}
    </div>
  );
};

export default GamePage;
