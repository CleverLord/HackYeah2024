import React from 'react';
import { Box, Typography } from '@mui/material';
import logo from '../logo.jpg'
function Header() {
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
                    style={{ height: '50px' }} // Adjust size as necessary
                />
            </Box>
        </Box>
    );
}

export default Header;
