import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const useGame = () => {
  return useContext(GameContext);
};

export const GameProvider = ({ children }) => {
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);

  const value = {
    currentGame,
    setCurrentGame,
    score,
    setScore
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
