import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navbar from './navbar';
import Footer from './footer';
import WhatsAppButton from './WhatsAppButton';

function MainLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>
      <Footer />
      <WhatsAppButton />
    </Box>
    
  );
}

export default MainLayout;