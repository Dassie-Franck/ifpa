import { Outlet } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import inscriptionTheme from '../../theme/inscriptionTheme';
import InscriptionNavbar from './InscriptionNavbar';
import InscriptionFooter from './InscriptionFooter';
function InscriptionLayout() {
  return (
    <ThemeProvider theme={inscriptionTheme}>
      <Box>
        <InscriptionNavbar />
        <Outlet />
        <InscriptionFooter />
        {/* Footer dédié à venir dans une prochaine section */}
      </Box>
    </ThemeProvider>
  );
}

export default InscriptionLayout;