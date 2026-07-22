import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A6192E',      // rouge institutionnel (boutons, accents, header sticky)
      dark: '#7A1220',      // bordeaux foncé (bandeau supérieur, bloc témoignages)
      light: '#C41E36',
    },
    secondary: {
      main: '#4FB8AE',      // turquoise (bandeau "Concours d'admission")
    },
    warning: {
      main: '#E8871E',      // orange (titres "ACTU", accents)
    },
    grey: {
      700: '#6E6E6E',       // bloc statistiques gris
      900: '#4A4A4A',       // footer
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#2B2B2B',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: { fontWeight: 800 },
    h4: { fontWeight: 800 },
    h5: { fontWeight: 700 },
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;