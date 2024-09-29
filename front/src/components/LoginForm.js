import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#d32f2f',
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
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '30px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '15px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ color: '#333' }}>
                        Zaloguj się
                    </Typography>

                    {loginError && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{errorMessage}</Alert>}

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={emailError}
                            helperText={emailError && "Email is required"}
                            InputLabelProps={{ style: { color: '#333' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: emailError ? '#d32f2f' : '#cccccc' },
                                    '&:hover fieldset': { borderColor: '#1976d2' },
                                    '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                                },
                                input: { color: '#333' },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={passwordError}
                            helperText={passwordError && "Password is required"}
                            InputLabelProps={{ style: { color: '#333' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: passwordError ? '#d32f2f' : '#cccccc' },
                                    '&:hover fieldset': { borderColor: '#1976d2' },
                                    '&.Mui-focused fieldset': { borderColor: '#1976d2' },
                                },
                                input: { color: '#333' },
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" sx={{ color: '#d32f2f' }} />}
                            label="Remember me"
                            sx={{ color: '#333' }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: '#1976d2',
                                color: '#ffffff',
                                borderRadius: '30px',
                                padding: '10px 20px',
                                fontSize: '16px',
                                '&:hover': {
                                    backgroundColor: '#115293',
                                },
                            }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" sx={{ color: '#1976d2' }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" sx={{ color: '#1976d2' }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
