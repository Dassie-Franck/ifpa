import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Box, 
  Button, 
  Container, 
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Header propre à l'espace inscription (§6.5) — distinct du site vitrine
function InscriptionNavbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Inscription', path: '/inscription/formulaire' },
    { label: 'FAQ', path: '/inscription/faq' },
    { label: 'Connexion', path: '/inscription/connexion', isButton: true },
  ];

  // Vérifie si un lien est actif
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const drawer = (
    <Box 
      sx={{ 
        width: 280, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fff'
      }}
      role="presentation"
    >
      {/* En-tête du drawer avec seulement le bouton fermer */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #eee'
        }}
      >
        <IconButton onClick={handleDrawerToggle} aria-label="Fermer le menu">
          <CloseIcon />
        </IconButton>
      </Box>

      <List sx={{ flex: 1, pt: 2 }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.path} 
            disablePadding 
            sx={{ 
              px: 2,
              py: 0.5
            }}
          >
            <ListItemButton
              component={RouterLink}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
                // Barre rouge à gauche pour l'élément actif dans le drawer
                borderLeft: isActive(item.path) ? '4px solid #D9700F' : '4px solid transparent',
                bgcolor: isActive(item.path) ? 'rgba(255, 0, 0, 0.05)' : 'transparent',
                ...(item.isButton && {
                  bgcolor: isActive(item.path) ? 'primary.dark' : 'primary.main',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  borderLeft: '4px solid transparent', // Pas de bordure rouge sur le bouton Connexion
                }),
              }}
            >
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{
                  fontWeight: item.isButton ? 700 : 500,
                  sx: {
                    color: item.isButton ? '#fff' : 'text.primary',
                    textAlign: 'center'
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        bgcolor: '#fff', 
        color: 'text.primary',
        borderBottom: '1px solid #eee'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: { xs: 1, sm: 1.5 } }}>
          {/* Logo */}
          <RouterLink to="/">
            <Box 
              component="img" 
              src="/assets/new_logo.jpeg" 
              alt="Logo IFPA" 
              sx={{ 
                height: { xs: 35, sm: 40, md: 45 },
                width: 'auto'
              }} 
            />
          </RouterLink>

          {/* Menu desktop */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            <Button 
              component={RouterLink} 
              to="/" 
              sx={{ 
                color: 'text.primary', 
                fontWeight: 600,
                fontSize: '0.875rem',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -2,
                  left: '50%',
                  transform: isActive('/') ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                  width: '80%',
                  height: '3px',
                  backgroundColor: '#D9700F',
                  transition: 'transform 0.3s ease',
                },
                '&:hover::after': {
                  transform: 'translateX(-50%) scaleX(1)',
                },
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              Accueil
            </Button>
            <Button
              component={RouterLink}
              to="/inscription/formulaire"
              sx={{ 
                color: 'text.primary', 
                fontWeight: 600,
                fontSize: '0.875rem',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -2,
                  left: '50%',
                  transform: isActive('/inscription/formulaire') ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                  width: '80%',
                  height: '3px',
                  backgroundColor: '#D9700F',
                  transition: 'transform 0.3s ease',
                },
                '&:hover::after': {
                  transform: 'translateX(-50%) scaleX(1)',
                },
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              Inscription
            </Button>
            <Button
              component={RouterLink}
              to="/inscription/faq"
              sx={{ 
                color: 'text.primary', 
                fontWeight: 600,
                fontSize: '0.875rem',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -2,
                  left: '50%',
                  transform: isActive('/inscription/faq') ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                  width: '80%',
                  height: '3px',
                  backgroundColor: '#D9700F',
                  transition: 'transform 0.3s ease',
                },
                '&:hover::after': {
                  transform: 'translateX(-50%) scaleX(1)',
                },
                '&:hover': {
                  bgcolor: 'rgba(0, 0, 0, 0.04)',
                }
              }}
            >
              FAQ
            </Button>
            <Button
              component={RouterLink}
              to="/inscription/connexion"
              variant="contained"
              color="primary"
              sx={{ 
                fontWeight: 700, 
                ml: 1,
                px: 3,
                py: 1,
                fontSize: '0.875rem',
                position: 'relative',
                // Barre rouge sous le bouton Connexion (optionnel)
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -2,
                  left: '50%',
                  transform: isActive('/inscription/connexion') ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                  width: '80%',
                  height: '3px',
                 
                  transition: 'transform 0.3s ease',
                },
                '&:hover::after': {
                  transform: 'translateX(-50%) scaleX(1)',
                },
              }}
            >
              Connexion
            </Button>
          </Box>

          {/* Menu burger - mobile */}
          <IconButton
            color="inherit"
            aria-label="Ouvrir le menu"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Drawer mobile */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default InscriptionNavbar;