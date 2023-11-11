import React from 'react';
import { Typography, Box } from '@mui/material';

// Componente que representa un escalón de la escalera numérica
const NumberStep = ({ number, label, isHighlighted = false, style }) => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100px',
    height: '60px',
    backgroundColor: isHighlighted ? 'orange' : 'grey',
    borderRadius: '10px',
    boxShadow: '0px 2px 4px rgba(0,0,0,0.3)',
    margin: '10px',
    ...style
  }}>
    <Typography variant="h6" component="div" color="white">
      {number}
    </Typography>
    <Typography variant="caption" component="div" color="white">
      {label}
    </Typography>
  </Box>
);

// Componente para representar el incremento o decremento
const StepIncrement = ({ symbol, style }) => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    mx: '5px',
    ...style
  }}>
    <Typography variant="h5" component="div" color="black">
      {symbol}
    </Typography>
  </Box>
);

// Componente principal que utiliza los escalones para mostrar los números anterior y posterior
const NumberStepsVisualization = ({ content, data }) => {

  const { previousNum, nextNum, num} = data;

  const stepStyle = (factor) => ({
    transform: `translateY(${factor * 20}px)`
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 4, padding: '25px' }}>
      
      {content.map((step, index) => (
        <Typography key={index} sx={{ mt: 1, mb: 1 }}>
          {step}
        </Typography>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <NumberStep number={previousNum} label="Antes" style={stepStyle(1)} />
        <StepIncrement symbol="-1" style={stepStyle(0.5)} />
        <NumberStep number={num} label="Actual" isHighlighted />
        <StepIncrement symbol="+1" style={stepStyle(-0.5)} />
        <NumberStep number={nextNum} label="Después" style={stepStyle(-1)} />
      </Box>      
    </Box>
  );
};

export default NumberStepsVisualization;
