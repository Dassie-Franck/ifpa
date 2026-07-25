import { Outlet } from 'react-router-dom';
import { ThemeProvider, Box } from '@mui/material';
import inscriptionTheme from '../../theme/inscriptionTheme';
import { CandidatAuthProvider } from '../../context/CandidatAuthContext';
import InscriptionNavbar from './InscriptionNavbar';
import InscriptionFooter from './InscriptionFooter';

function InscriptionLayout() {
  return (
    <ThemeProvider theme={inscriptionTheme}>
      <CandidatAuthProvider>
        <Box>
          <InscriptionNavbar />
          <Outlet />
          <InscriptionFooter />
        </Box>
      </CandidatAuthProvider>
    </ThemeProvider>
  );
}

export default InscriptionLayout;