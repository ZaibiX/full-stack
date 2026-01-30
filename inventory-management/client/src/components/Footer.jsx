import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#f9fafb', // matches bg-gray-50
        borderTop: '1px solid #e5e7eb', // matches border-gray-200
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Brand/Copyright */}
          <Typography variant="body2" color="text.secondary">
            {'© '}
            <span style={{ fontWeight: 'bold', color: '#2563eb' }}>StockTrack</span>{' '}
            {new Date().getFullYear()}
            {'. All rights reserved.'}
          </Typography>

          {/* Links */}
          {/* <Box sx={{ mt: { xs: 2, md: 0 }, display: 'flex', gap: 3 }}>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '0.875rem' }}>
              Documentation
            </Link>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '0.875rem' }}>
              Support
            </Link>
            <Link href="#" underline="hover" color="inherit" sx={{ fontSize: '0.875rem' }}>
              Privacy Policy
            </Link>
          </Box> */}
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;