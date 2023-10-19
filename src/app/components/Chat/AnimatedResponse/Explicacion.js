import React from 'react';
import { Typography, Box, useTheme, useMediaQuery, List, ListItem, Divider } from '@mui/material';
import { styled } from '@mui/system';

const Explicacion = ({ content, data, children }) => {
    const contentJson = JSON.parse(content);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const ProcessStep = styled(ListItem)(({ theme }) => ({
        padding: theme.spacing(2),
        backgroundColor: theme.palette.secondary.light,
        margin: theme.spacing(1, 0),
        borderRadius: theme.shape.borderRadius,
    }));

    return (
        <Box sx={{ fontFamily: "'Comic Sans MS', sans-serif", color: theme.palette.primary.main, backgroundColor: theme.palette.background.default }}>
            <Typography variant="h5" sx={{ fontSize: '1.5rem' }}>
                {contentJson.saludo}. {contentJson.tema}
            </Typography>
            <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>{contentJson.ejemplo.problema}</Typography>
            {children}
            
            <Typography variant="h6" sx={{ fontSize: '1.2rem' }}>{contentJson.ejemplo.resultado}</Typography>
            <Typography>
                {contentJson.conclusion}. {contentJson.sugerencia_practica}
            </Typography>
        </Box>
    );
};

export default Explicacion;
