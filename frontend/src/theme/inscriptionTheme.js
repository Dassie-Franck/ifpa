import { createTheme } from '@mui/material/styles';

// Thème dédié à l'espace inscription — palette orange/bleu, distincte
// du site vitrine, pour bien signaler qu'on entre dans "l'application" candidat.
const inscriptionTheme = createTheme({
  palette: {
    primary: {
      main: '#F5821F',      // orange CTA
      dark: '#D9700F',
    },
    secondary: {
      main: '#2D9CDB',      // bleu accents / flèches
    },
    background: {
      default: '#FAFAFA',
    },
    text: {
      primary: '#222222',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
  shape: {
    borderRadius: 4,
  },
});

export default inscriptionTheme;