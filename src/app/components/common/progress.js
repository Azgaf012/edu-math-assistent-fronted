import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

const LoadingMessage = () => (
    <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        height="80vh" 
        bgcolor="rgba(255,255,255,0.7)" // Translucidez ligera para que se vea lo que hay detrás
    >
      <CircularProgress color="primary" size={60} /> 
      <Typography variant="h4" style={{marginTop: '1rem'}}>🤖 Pensando...</Typography>
    </Box>
);

export default LoadingMessage;
