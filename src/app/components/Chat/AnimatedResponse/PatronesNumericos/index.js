import React from 'react';
import { Typography, Box, Paper, Divider } from '@mui/material';

const SequenceDisplay = ({ sequence, step }) => {

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', p: 1 }}>
      {sequence.map((number, index) => (
        <React.Fragment key={index}>
          <Paper elevation={3} sx={{ px: 1, py: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minHeight: '20px', minWidth: '20px', m: 1 }}>
            <Typography variant="h6">{number}</Typography>
          </Paper>
          {index < sequence.length - 1 && ( // No agregar para el último elemento
            <>
              <Typography variant="h5" component="span" sx={{ fontSize: '1rem' }}>+</Typography>
              <Typography variant="h5" component="span" sx={{ fontSize: '1rem' }}>{step}</Typography>
            </>
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

const commonStyles = {
  padding: '8px',
  margin: '8px',
  borderRadius: '4px',
  textAlign: 'center',
};

const NumberPatternsComponent = ({ content, data }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', p: 2 }}>
      <Box sx={{ width: '40%', ...commonStyles, border: '1px solid #FF69B4', bgcolor: '#FFF0F5' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#FF69B4' }}>Pasos para encontrar el patrón:</Typography>
        <Box sx={{ ...commonStyles }}>
          {content.map((step, index) => (
            <React.Fragment key={index}>
              <Typography variant="body1">{step}</Typography>
              {index !== content.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Box>
      </Box>
      <Box sx={{ width: '60%', overflow: 'auto' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Secuencia con Patrón:</Typography>
        <SequenceDisplay sequence={data.sequence} step={data.step} />
      </Box>
    </Box>
  );
};

export default NumberPatternsComponent;
