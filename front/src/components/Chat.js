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
        <Container maxWidth="sm" sx={{ mt: 5, backgroundColor: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" color="primary" gutterBottom>
                Chat Room
            </Typography>
            <Box sx={{ mb: 2, border: '1px solid #cccccc', borderRadius: '10px', height: '300px', overflowY: 'scroll', p: 2 }}>
                {messages.map((msg, index) => (
                    <Typography key={index} variant="body1" color="textPrimary">
                        {msg}
                    </Typography>
                ))}
            </Box>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#cccccc' }, '&:hover fieldset': { borderColor: '#d32f2f' }, '&.Mui-focused fieldset': { borderColor: '#d32f2f' } } }}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSendMessage}
                sx={{ mt: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#d32f2f' } }} // Red on hover
            >
                Send
            </Button>
        </Container>
    );
}

export default Chat;