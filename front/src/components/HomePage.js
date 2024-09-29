import React from 'react';
import { Box, Container, Typography, Button, Divider, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Define a custom theme to match the login form style
const theme = createTheme({
    palette: {
        primary: {
            main: '#005f99', // Blue for main actions
        },
        secondary: {
            main: '#d32f2f', // Red for secondary actions or highlights
        },
        text: {
            primary: '#333333', // Darker text color for readability
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            fontWeight: 600,
        },
    },
});

function HomePage() {
    const navigate = useNavigate();

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <Paper
                    elevation={3}
                    sx={{
                        padding: '40px',
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#f4f4f4', // Subtle light background, similar to login form
                        borderRadius: '8px',
                        border: '1px solid #cccccc', // Soft border to match login form
                    }}
                >
                    <Typography variant="h5" sx={{ marginBottom: 20, color: '#005f99', fontWeight: 'bold', textAlign: 'center' }}>
                        Witaj w asystencie podatkowym TaxYeah!
                    </Typography>

                    {/* Buttons */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '100%',
                            gap: 3,
                        }}
                    >
                        <Button
                            onClick={() => navigate('/login')}
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#005f99',
                                color: '#ffffff',
                                padding: '12px',
                                fontSize: '16px',
                                '&:hover': {
                                    backgroundColor: '#004080', // Darker blue on hover
                                },
                            }}
                        >
                            Zaloguj się
                        </Button>

                        <Button
                            onClick={() => navigate('/chat')}
                            variant="contained"
                            fullWidth
                            sx={{
                                backgroundColor: '#d32f2f',
                                color: '#ffffff',
                                padding: '12px',
                                fontSize: '16px',
                                '&:hover': {
                                    backgroundColor: '#b71c1c', // Darker red on hover
                                },
                            }}
                        >
                            Asystent AI
                        </Button>
                    </Box>

                    {/* Divider */}
                    <Divider sx={{ width: '100%', marginTop: '20px', borderBottomWidth: '1px', borderColor: '#cccccc' }} />

                    {/* Footer */}
                    <Typography variant="body2" sx={{ marginTop: '20px', color: '#666666', textAlign: 'center' }}>
                        Potrzebujesz pomocy? Odwiedź naszą stronę FAQ lub skontaktuj się z supportem.
                    </Typography>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default HomePage;
