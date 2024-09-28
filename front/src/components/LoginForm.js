import React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Blue for main accents
        },
        secondary: {
            main: '#d32f2f', // Red accent for subtle highlights
        },
        background: {
            default: '#ffffff', // White background
        },
        text: {
            primary: '#333333', // Dark text for readability
        },
    },
});

export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
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
                        padding: '20px',
                        backgroundColor: '#ffffff', // White form background
                        borderRadius: '10px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}> {/* Red accent in Avatar */}
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ color: '#333' }}>
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            InputLabelProps={{ style: { color: '#333' } }} // Darker label color
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#cccccc' }, // Lighter border for input
                                    '&:hover fieldset': { borderColor: '#d32f2f' }, // Red hover effect
                                    '&.Mui-focused fieldset': { borderColor: '#d32f2f' }, // Red on focus
                                },
                                input: { color: '#333' }, // Dark input text
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
                            InputLabelProps={{ style: { color: '#333' } }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: '#cccccc' },
                                    '&:hover fieldset': { borderColor: '#d32f2f' }, // Red hover effect
                                    '&.Mui-focused fieldset': { borderColor: '#d32f2f' }, // Red on focus
                                },
                                input: { color: '#333' },
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" sx={{ color: '#d32f2f' }} />} // Red checkbox
                            label="Remember me"
                            sx={{ color: '#333' }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, backgroundColor: '#1976d2', color: '#ffffff' }}
                        >
                            Sign in
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2" sx={{ color: '#d32f2f' }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2" sx={{ color: '#d32f2f' }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" align="center" sx={{ mt: 2, color: '#333' }}>
                            or
                        </Typography>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<GoogleIcon />}
                            sx={{
                                mt: 1,
                                mb: 1,
                                color: '#333',
                                borderColor: '#cccccc',
                                '&:hover': {
                                    borderColor: '#d32f2f', // Red border on hover
                                },
                            }}
                        >
                            Sign in with Google
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<FacebookIcon />}
                            sx={{
                                mt: 1,
                                mb: 2,
                                color: '#333',
                                borderColor: '#cccccc',
                                '&:hover': {
                                    borderColor: '#d32f2f', // Red border on hover
                                },
                            }}
                        >
                            Sign in with Facebook
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
