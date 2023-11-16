import React, { useRef, useEffect, useState } from 'react';
import { Typography, Box, Paper, Divider, List, ListItem } from '@mui/material';

const blockSizeHundreds = '10vh';
const blockSizeTens = '8vh';
const blockSizeOnes = '6vh';

const NumberBlockColumn = ({ count, label, color, size }) => {
  return (
    <Box sx={{ flex: 1, m: 1, minWidth: 0 }}>
      <Typography variant="subtitle2" align="center" gutterBottom>{label}</Typography>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
        {[...Array(count)].map((_, i) => (
          <Paper
            key={i}
            elevation={3}
            sx={{
              bgcolor: color,
              width: size,
              height: size,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '5px'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const DecompositionSteps = ({ steps }) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto' }}>
      {steps.map((step, index) => (
        <ListItem key={index}>
          <Typography variant="body1">{step}</Typography>
        </ListItem>
      ))}
    </List>
  );
};

const FunNumberDecomposition = ({ hundreds, tens, ones, steps }) => {
  const stepsRef = useRef();
  const [blockColumnsWidth, setBlockColumnsWidth] = useState('0px');

  useEffect(() => {
    // Establece el ancho de las columnas de bloques para usar el ancho restante de los pasos
    if (stepsRef.current) {
      const stepsWidth = stepsRef.current.offsetWidth;
      const totalWidth = stepsRef.current.parentElement.offsetWidth;
      const remainingWidth = totalWidth - stepsWidth;
      setBlockColumnsWidth(`${remainingWidth}px`);
    }
  }, [steps]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', p: 2, alignItems: 'flex-start', width: '100%' }}>
      <Box ref={stepsRef} sx={{ width: '40%', overflow: 'auto' }}>
        <DecompositionSteps steps={steps} />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ display: 'flex', flexDirection: 'row', width: blockColumnsWidth, overflow: 'auto', alignItems: 'flex-start' }}>
        <NumberBlockColumn count={hundreds} label="Centenas" color="#FFCDD2" size={blockSizeHundreds} />
        <Divider orientation="vertical" flexItem />
        <NumberBlockColumn count={tens} label="Decenas" color="#C8E6C9" size={blockSizeTens} />
        <Divider orientation="vertical" flexItem />
        <NumberBlockColumn count={ones} label="Unidades" color="#BBDEFB" size={blockSizeOnes} />
      </Box>
    </Box>
  );
};

export default FunNumberDecomposition;
