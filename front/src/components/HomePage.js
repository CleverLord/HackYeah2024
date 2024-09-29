import React from 'react';
import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ backgroundColor: '#ffffff', padding: '30px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
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
                {/* Header Section */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                        gap: 4,
                    }}
                >
                    <Button
                        onClick={() => navigate('/login')}
                        sx={{
                            width: '300px',
                            height: '150px',
                            backgroundColor: '#1976d2', // Blue background
                            color: '#ffffff', // White text
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: '#d32f2f', // Red on hover
                            },
                        }}
                    >
                        <Typography variant="h6">LOG IN</Typography>
                    </Button>

                    <Button
                        onClick={() => navigate('/chat')}
                        sx={{
                            width: '300px',
                            height: '150px',
                            backgroundColor: '#1976d2',
                            color: '#ffffff',
                            borderRadius: '10px',
                            '&:hover': {
                                backgroundColor: '#d32f2f', // Red on hover
                            },
                        }}
                    >
                        <Typography variant="h6">CHAT</Typography>
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

export default HomePage;
