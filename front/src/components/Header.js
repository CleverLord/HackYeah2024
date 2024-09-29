import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../logo.jpg'
import {useNavigate} from "react-router-dom";
function Header() {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 40px',
                position: 'relative',
            }}
        >
            {/* Logo on the left */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <img
                    src={logo}
                    alt="gov.pl logo"
                    style={{ height: '50px' }}
                    onClick={() => navigate("/chat")}// Adjust size as necessary
                />
            </Box>
        </Box>
    );
}

export default Header;
