import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            setMessages([...messages, inputMessage]);
            setInputMessage('');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Chat
            </Typography>
            <Box sx={{ mb: 2, border: '1px solid gray', height: '300px', overflowY: 'scroll', p: 2 }}>
                {messages.map((msg, index) => (
                    <Typography key={index} variant="body1">
                        {msg}
                    </Typography>
                ))}
            </Box>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Wpisz wiadomość..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSendMessage}
                sx={{ mt: 2 }}
            >
                Wyślij
            </Button>
        </Container>
    );
}

export default Chat;