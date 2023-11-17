import React from 'react';
import { Typography, Box, useTheme} from '@mui/material';

const Explicacion = ({ content, children }) => {
    
    const theme = useTheme();
    const { saludo, ejemplo } = content;
    const { problema, resultado} = ejemplo;

    return (
        <Box sx={{ fontFamily: "'Comic Sans MS', sans-serif", color: theme.palette.primary.main, backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>
                {saludo}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.2rem'}}>{problema}</Typography>
            {children}
            
            <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>{resultado}</Typography>

        </Box>
    );
};

export default Explicacion;
