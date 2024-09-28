import React from 'react';
import { Button, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm">
            <Box
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}
            >
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/login')}
                    sx={{ mb: 2 }}
                >
                    Logowanie
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/chat')}
                >
                    Chat
                </Button>
            </Box>
        </Container>
    );
}

export default HomePage;