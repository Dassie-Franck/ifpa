import { ThemeProvider } from '@mui/material';
import inscriptionTheme from '../theme/inscriptionTheme';
import Login from './Login';

// Ce wrapper applique le thème orange (celui de l'espace inscription)
// uniquement à la page de connexion, sans affecter le reste du site.
function LoginPage() {
  return (
    <ThemeProvider theme={inscriptionTheme}>
      <Login />
    </ThemeProvider>
  );
}

export default LoginPage;