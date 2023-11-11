import React from 'react';
import { Typography, Box } from '@mui/material';

const NumberLine = ({ min, max, children }) => {

    const range = max - min;
    const step = range <= 20 ? 1 : 5;
  
    const marks = Array.from(
      { length: Math.floor(range / step) + 1 },
      (_, index) => min + index * step
    );
  
    return (
      <Box sx={{
        position: 'relative',
        height: '4px',
        backgroundColor: 'gray',
        width: '100%',
        mt: 4,
        mb: 4
      }}>
        {marks.map((mark) => (
          <Box key={mark} sx={{
            position: 'absolute',
            left: `${((mark - min) / range) * 100}%`,
            transform: 'translateX(-50%)',
          }}>
            <Typography variant="caption" sx={{ display: 'block', mb: '-20px' }}>
              {mark}
            </Typography>
            <Box sx={{
              position: 'absolute',
              top: '20px',
              left: '50%',
              width: '2px',
              height: '10px',
              backgroundColor: 'black',
              transform: 'translateX(-50%)',
            }} />
          </Box>
        ))}
        {children}
      </Box>
    );
  };
  
  const NumberPoint = ({ number, position }) => (
    <Box sx={{
      position: 'absolute',
      left: `${position}%`,
      top: '-30px',
      transform: 'translate(-50%, -50%)',
      width: '50px', 
      height: '50px', 
      borderRadius: '50%',
      backgroundColor: 'skyblue', 
      color: 'black', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem',
      boxShadow: '0px 3px 6px rgba(0,0,0,0.2)' 
    }}>
      {number}
    </Box>
  );


const NumberComparisonOnLine = ({ number1, number2 }) => {

  const min = Math.min(number1, number2) - 10; 
  const max = Math.max(number1, number2) + 10; 

  const position1 = ((number1 - min) / (max - min)) * 100;
  const position2 = ((number2 - min) / (max - min)) * 100;

  return (
    <Box sx={{ width: '100%', mt: 2, mb: 2 }}>
      <Typography variant="caption" display="block" textAlign="center">
        Recta Numérica
      </Typography>
      <NumberLine min={min} max={max}>
        <NumberPoint number={number1} position={position1} />
        <NumberPoint number={number2} position={position2} />
      </NumberLine>
    </Box>
  );
};

const NumberComparisonProcess = ({ content, data }) => {
  const { num1, num2 } = data;
  return (
    <Box my={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center" p={5}   >
      
      {content.map((step, index) => (
        <Typography key={index}>{step}</Typography>
      ))}
      <NumberComparisonOnLine number1={num1} number2={num2} />
     
    </Box>
  );
};

export default NumberComparisonProcess;
