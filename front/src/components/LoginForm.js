import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Box, Typography, Container, Alert, Paper, Divider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormControlLabel, Checkbox } from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#005f99', // Subtle blue used in the reference page
        },
        secondary: {
            main: '#d32f2f', // Error or secondary color
        },
        background: {
            default: '#ffffff',
        },
        text: {
            primary: '#333333',
        },
    },
});

export default function SignIn() {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email');
        const password = data.get('password');

        // Basic validation
        setEmailError(!email);
        setPasswordError(!password);

        if (!email || !password) {
            setErrorMessage('Both email and password are required.');
            setLoginError(true);
            return;
        }

        const userData = {
            email,
            password,
        };

        try {
            // Send request to gather session-id
            const response = await axios.get('http://192.168.137.1:8000/start-conversation/', userData);

            const sessionId = response.data['session-id'];
            localStorage.setItem('session-id', sessionId);

            console.log('Session ID:', sessionId);
            navigate('/chat');
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Invalid credentials or server error.');
            setLoginError(true);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Paper
                    elevation={3}
                    sx={{
                        padding: '40px 30px',
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#f4f4f4', // Subtle light background to match the reference
                        borderRadius: '8px',
                        border: '1px solid #cccccc', // Soft border for the form
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                        Log in to your account
                    </Typography>

                    {/* Error alert for login issues */}
                    {loginError && (
                        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                            {errorMessage}
                        </Alert>
                    )}

                    {/* Form begins here */}
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
                        <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold', color: '#005f99' }}>
                            Email Address
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            autoComplete="email"
                            error={emailError}
                            helperText={emailError && 'Email is required'}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#cccccc' },
                                    '&:hover fieldset': { borderColor: '#005f99' },
                                    '&.Mui-focused fieldset': { borderColor: '#005f99' },
                                },
                                backgroundColor: '#ffffff', // White input background
                            }}
                        />
                        <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold', color: '#005f99', mt: 2 }}>
                            Password
                        </Typography>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={passwordError}
                            helperText={passwordError && 'Password is required'}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#cccccc' },
                                    '&:hover fieldset': { borderColor: '#005f99' },
                                    '&.Mui-focused fieldset': { borderColor: '#005f99' },
                                },
                                backgroundColor: '#ffffff',
                            }}
                        />

                        {/* Remember Me Checkbox */}
                        <FormControlLabel
                            control={<Checkbox value="remember" sx={{ color: '#005f99' }} />}
                            label="Remember me"
                            sx={{ color: '#333' }}
                        />

                        <Divider sx={{ my: 2 }} />

                        {/* Login Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#005f99',
                                color: '#ffffff',
                                padding: '12px 20px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#004080',
                                },
                            }}
                        >
                            Log in
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
