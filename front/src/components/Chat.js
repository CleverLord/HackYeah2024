import React, { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Avatar, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [sessionId, setSessionId] = useState(1); // Assuming you already have session-id initialized (use a default or fetched value)
    const [isEnd, setIsEnd] = useState(false); // To store if 'end': true is found
    const [xmlFile, setXmlFile] = useState(null); // To store XML file content

    // API Endpoints
    const finalEndpoint = 'http://192.168.137.1:8000/final/';
    const templateEndpoint = 'http://192.168.137.1:8000/get-template'; // To get the XML file

    // Function to send user message and post to the backend with session-id
    const handleSendMessage = async () => {
        if (inputMessage.trim() === '') return;

        // Add user's message to the chat display
        const userMessage = {
            text: inputMessage,
            sender: 'user',
            time: new Date().toLocaleTimeString(),
        };
        setMessages((prevMessages) => [...prevMessages, userMessage]);
        setInputMessage(''); // Clear input field

        try {
            // Prepare the formatted request body with session-id and message
            const requestBody = {
                session_id: sessionId, // Use the saved session-id
                message: inputMessage, // The message content
            };

            // Send the message to the final endpoint and get the response
            const response = await axios.post(finalEndpoint, requestBody);
            console.log('Message sent successfully:', response.data);

            // Extract the server's user_response (which seems to be the correct message field)
            const serverResponse = response.data.user_response;

            // Split the response in case it has multiple lines (newlines)
            const serverMessages = serverResponse.split('\n').map((line) => ({
                text: line,
                sender: 'server',
                time: new Date().toLocaleTimeString(),
            }));

            // Add server's message(s) to the chat display
            setMessages((prevMessages) => [...prevMessages, ...serverMessages]);

            // Check if 'end': true is received
            if (response.data.end === true) {
                setIsEnd(true);
                fetchTemplate(); // Fetch XML template once 'end': true is received
            }

        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Function to fetch XML file once 'end': true is received
    const fetchTemplate = async () => {
        try {
            const response = await axios.get(templateEndpoint, { responseType: 'blob' }); // Request the XML as a blob
            setXmlFile(response.data); // Store the XML file
            console.log('Template fetched successfully.');
        } catch (error) {
            console.error('Error fetching XML template:', error);
        }
    };

    // Function to download the XML file
    const downloadXml = () => {
        if (!xmlFile) return;

        const url = window.URL.createObjectURL(new Blob([xmlFile], { type: 'application/xml' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'template.xml'); // File name for download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Remove the link after download
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

            {/* Button to download XML template if available */}
            {isEnd && xmlFile && (
                <Button variant="contained" color="primary" onClick={downloadXml} sx={{ mt: 2 }}>
                    Download XML Template
                </Button>
            )}
        </Container>
    );
}

export default Chat;
