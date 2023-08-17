import React from 'react';
import Button from '../components/common/Button';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Bienvenido al asistente virtual de matemáticas</h1>
      <p>¡Aprende y diviértete con nuestra IA!</p>
      <Button label="Iniciar Chat" onClick={() => {/* Navigate to Chat */}} />
      <Button label="Jugar" onClick={() => {/* Navigate to Games */}} />
    </div>
  );
};

export default HomePage;
