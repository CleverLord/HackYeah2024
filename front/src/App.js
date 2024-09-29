import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Import Routes i Route z react-router-dom
import HomePage from './components/HomePage';     // Import komponentu HomePage
import LoginForm from './components/LoginForm';   // Import komponentu LoginForm
import Chat from './components/Chat';
import Header from './components/Header';
function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/chat" element={<Chat />} />
            </Routes>
        </>
  );
}

export default App;
