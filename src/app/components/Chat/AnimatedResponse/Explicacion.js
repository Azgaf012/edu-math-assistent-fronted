import React from 'react';
import { Typography, Box, useTheme} from '@mui/material';

const Explicacion = ({ content, children }) => {
    const theme = useTheme();
    
    return (
        <Box sx={{ fontFamily: "'Comic Sans MS', sans-serif", color: theme.palette.primary.main, backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>
                {content.saludo}. {content.tema}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>{content.ejemplo.problema}</Typography>
            {children}
            
            <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>{content.ejemplo.resultado}</Typography>
            <Typography>
                {content.conclusion}. {content.sugerencia_practica}
            </Typography>
        </Box>
    );
};

export default Explicacion;
