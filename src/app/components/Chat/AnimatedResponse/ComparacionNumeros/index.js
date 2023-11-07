import React from 'react';
import { Typography, Box } from '@mui/material';

// Componente que representa la recta numérica completa
const NumberLine = ({ min, max, children }) => {
    // Ajustar el espaciado de las marcas en función del rango
    const range = max - min;
    const step = range <= 20 ? 1 : 5; // Ajusta este valor según la necesidad
  
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
  
  // Componente que representa un punto en la recta numérica
  const NumberPoint = ({ number, position }) => (
    <Box sx={{
      position: 'absolute',
      left: `${position}%`,
      top: '-30px', // Mover el punto hacia arriba para evitar solapamientos con las marcas
      transform: 'translate(-50%, -50%)',
      width: '50px', // Hacer el punto más grande
      height: '50px', // Hacer el punto más grande
      borderRadius: '50%',
      backgroundColor: 'skyblue', // Usar un color más llamativo
      color: 'black', // Cambiar el color del texto para mejorar el contraste
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1rem', // Aumentar el tamaño del texto
      boxShadow: '0px 3px 6px rgba(0,0,0,0.2)' // Añadir sombra para resaltar el punto
    }}>
      {number}
    </Box>
  );

// Componente para mostrar la comparación en la recta numérica
const NumberComparisonOnLine = ({ number1, number2 }) => {
  // Determinamos el rango de la recta numérica basado en los números proporcionados
  const min = Math.min(number1, number2) - 10; // 10 unidades menos que el menor número para dar espacio
  const max = Math.max(number1, number2) + 10; // 10 unidades más que el mayor número para dar espacio

  // Calcular la posición de los números en la recta
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

// Componente principal que utiliza el componente de recta numérica
const NumberComparisonProcess = ({ content, data }) => {
  return (
    <Box my={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      
      {content.ejemplo.pasos.map((step, index) => (
        <Typography key={index}>{step}</Typography>
      ))}
      <NumberComparisonOnLine number1={data.num1} number2={data.num2} />
     
    </Box>
  );
};

export default NumberComparisonProcess;
