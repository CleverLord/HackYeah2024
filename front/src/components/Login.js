import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', {
                email: email, // Sending only the email
            });
            setMessage(response.data.message); // Displaying the response message
        } catch (error) {
            setMessage('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
        }
    };

    return (
        <div className="login-box">
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>{message}</p>
        </div>
    );
}

export default Login;