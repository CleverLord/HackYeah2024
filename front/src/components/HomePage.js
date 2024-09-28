import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    textAlign: 'center',
                    gap: 4,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Witaj w naszej aplikacji!
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                        gap: 4,
                    }}
                >
                    {/* Logowanie Box */}
                    <Box
                        onClick={() => navigate('/login')}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '300px',
                            height: '300px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        <Typography variant="h6" color="primary">
                            LOGOWANIE
                        </Typography>
                    </Box>

                    {/* Chat Box */}
                    <Box
                        onClick={() => navigate('/chat')}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '300px',
                            height: '300px',
                            backgroundColor: '#f5f5f5',
                            borderRadius: '15px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s ease-in-out',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        <Typography variant="h6" color="primary">
                            CHAT
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default HomePage;