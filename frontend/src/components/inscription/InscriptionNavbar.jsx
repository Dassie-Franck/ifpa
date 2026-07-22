import { AppBar, Toolbar, Box, Button, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Header propre à l'espace inscription (§6.5) — distinct du site vitrine
function InscriptionNavbar() {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: '#fff', color: 'text.primary' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1.5 }}>
          <RouterLink to="/">
            <Box component="img" src="/assets/new_logo.jpeg" alt="Logo IFPA" sx={{ height: 45 }} />
          </RouterLink>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button component={RouterLink} to="/" sx={{ color: 'text.primary', fontWeight: 600 }}>
              Accueil
            </Button>
            <Button
              component={RouterLink}
              to="/inscription/formulaire"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              Inscription
            </Button>
            <Button
              component={RouterLink}
              to="/inscription/faq"
              sx={{ color: 'text.primary', fontWeight: 600 }}
            >
              Faq
            </Button>
            <Button
              component={RouterLink}
              to="/inscription/connexion"
              variant="contained"
              color="primary"
              sx={{ fontWeight: 700, ml: 1 }}
            >
              Connexion
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default InscriptionNavbar;