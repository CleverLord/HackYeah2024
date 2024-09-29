import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Avatar, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    // API Endpoints
    const conversationEndpoint = 'http://192.168.137.1:8000/conversation/';

    // Function to send user message and use session-id
    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        // Add user's message to the chat
        const userMessage = {
            text: inputMessage,
            sender: 'user',
            time: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputMessage(''); // Clear input field

        try {
            // Get session-id from localStorage
            const sessionId = localStorage.getItem('session-id');

            // Prepare the formatted request body
            const requestBody = {
                session_id: sessionId,
                body: inputMessage, // The message content
            };

            // Send the message to the conversation endpoint
            await axios.post(conversationEndpoint, requestBody);

        } catch (error) {
            console.error('Error communicating with the backend:', error);
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 2, backgroundColor: '#ffffff', borderRadius: '10px', height: '80vh', display: 'flex', flexDirection: 'column', padding: '0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>

            {/* Chat Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '15px', backgroundColor: '#f4f4f4', borderBottom: '1px solid #cccccc' }}>
                <Avatar src="https://i.pravatar.cc/40?img=1" alt="Visitor" sx={{ marginRight: '10px' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#005f99' }}>Visitor</Typography>
            </Box>

            {/* Chat Messages Container */}
            <Box sx={{ flex: 1, overflowY: 'scroll', padding: '20px', backgroundColor: '#f5f5f5' }}>
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            alignItems: 'flex-end',
                            marginBottom: '10px'
                        }}
                    >
                        {msg.sender !== 'user' && <Avatar src="https://i.pravatar.cc/40?img=2" alt="Visitor" sx={{ marginRight: '10px' }} />} {/* Avatar for the system/visitor */}
                        <Box
                            sx={{
                                maxWidth: '60%',
                                padding: '10px 15px',
                                borderRadius: '15px',
                                backgroundColor: msg.sender === 'user' ? '#005f99' : '#ffffff',
                                color: msg.sender === 'user' ? '#fff' : '#000',
                                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                                {msg.text}
                            </Typography>
                            <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', marginTop: '5px', fontSize: '0.75rem', color: msg.sender === 'user' ? '#f1f1f1' : '#999' }}>
                                {msg.time}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>

            {/* Input Field and Send Button */}
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '15px', backgroundColor: '#f4f4f4', borderTop: '1px solid #cccccc' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type your message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} // Send message on Enter key
                    sx={{
                        mr: 2,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: '#cccccc' },
                            '&:hover fieldset': { borderColor: '#005f99' },
                            '&.Mui-focused fieldset': { borderColor: '#005f99' },
                        },
                    }}
                />
                <IconButton color="primary" onClick={handleSendMessage} sx={{ padding: '10px' }}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Container>
    );
}

export default Chat;
