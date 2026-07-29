import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link as RouterLink, useLocation } from 'react-router-dom';

// Bandeau secondaire (au-dessus du header) - §7.2 du cahier des charges
const topBarLinks = [
  // { label: 'Moodle', path: '/espace-apprenant' },
  { label: 'Actualité', path: '/institut/espace-presse' },
  // { label: 'Alumni', path: '/alumni' },
  // { label: 'Faire un don', path: '/don' },
  // { label: 'Médiathèque', path: '/mediatheque' },
  { label: 'Espace Etudiant', path: '/inscription/connexion' },
];

// Menu principal - §7.1 du cahier des charges
const mainNavLinks = [
  {
    label: "L'INSTITUT",
    path: '/institut',
    subLinks: [
      { label: 'Qui sommes-nous ?', path: '/institut/qui-sommes-nous' },
      { label: 'Nos approches pédagogiques', path: '/institut/pedagogicalApproach' },
      { label: 'Nos équipes', path: '/institut/nos-equipes' },
      { label: 'Espace presse', path: '/institut/espace-presse' },
    ],
  },
  { label: 'ADMISSION', path: '/admission' },
  { label: 'FORMATION', path: '/formation' },
  {
    label: 'PARTENARIATS & STAGES',
    path: '/partenariats',
    subLinks: [
      { label: 'Structures de stage partenaires', path: '/partenariats/structures-de-stage' },
      // { label: 'Opportunités professionnelles', path: '/partenariats/opportunites' },
    ],
  },
  {
    label: 'VIE AU CAMPUS',
    path: '/vie-au-campus',
    subLinks: [
      { label: 'Présentation du/des site(s)', path: '/vie-au-campus/presentation' },
    ],
  },
  // { label: 'ENTREPRISES', path: '/recruteurs' },
  // { label: 'FONDS DE SOLIDARITÉ', path: '/fonds-de-solidarite' },
];

function Navbar() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState({});

  const handleOpenSubMenu = (event, label) => {
    setAnchorEl(event.currentTarget);
    setOpenSubMenu(label);
  };

  const handleCloseSubMenu = () => {
    setAnchorEl(null);
    setOpenSubMenu(null);
  };

  const handleMobileSubMenuToggle = (label) => {
    setMobileSubMenuOpen(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  // Vérifie si un lien est actif (exact ou chemin parent)
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    // Pour les sous-menus, on vérifie si le chemin commence par le path
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Bandeau supérieur bordeaux */}
      <Box sx={{ bgcolor: 'primary.dark', color: '#fff', py: 0.6 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Icônes réseaux sociaux */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton size="small" sx={{ color: '#fff' }} aria-label="Twitter">
                <TwitterIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#fff' }} aria-label="Facebook">
                <FacebookIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#fff' }} aria-label="LinkedIn">
                <LinkedInIcon sx={{ fontSize: 16 }} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#fff' }} aria-label="Instagram">
                <InstagramIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>

            {/* Liens rapides - masqués sur mobile */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {topBarLinks.map((link) => (
                <RouterLink
                  key={link.path}
                  to={link.path}
                  style={{
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    borderBottom: isActive(link.path) ? '2px solid #ff0000' : '2px solid transparent',
                    paddingBottom: '2px',
                  }}
                >
                  {link.label}
                </RouterLink>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Header principal sticky - blanc */}
      <AppBar
        position="sticky"
        elevation={2}
        sx={{ bgcolor: '#fff', color: 'text.primary' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo IFPA */}
            <RouterLink to="/">
              <Box 
                component="img"
                src="/assets/new_logo.jpeg"
                alt="Logo IFPA"
                sx={{ height: 85, width: 'auto' }}
              />
            </RouterLink>

            {/* Menu principal - desktop */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.5 }}>
              {mainNavLinks.map((link) =>
                link.subLinks ? (
                  <Box key={link.label} sx={{ position: 'relative' }}>
                    <Button
                      onClick={(e) => handleOpenSubMenu(e, link.label)}
                      endIcon={<KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
                      sx={{
                        color: 'text.primary',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        px: 1.2,
                        borderBottom: isActive(link.path) ? '3px solid #ff0000' : '3px solid transparent',
                        borderRadius: 0,
                        '&:hover': {
                          borderBottom: '3px solid #ff0000',
                        },
                      }}
                    >
                      {link.label}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={openSubMenu === link.label}
                      onClose={handleCloseSubMenu}
                    >
                      {link.subLinks.map((sub) => (
                        <MenuItem
                          key={sub.path}
                          component={RouterLink}
                          to={sub.path}
                          onClick={handleCloseSubMenu}
                          sx={{
                            backgroundColor: isActive(sub.path) ? 'rgba(255, 0, 0, 0.08)' : 'transparent',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 0, 0, 0.04)',
                            },
                          }}
                        >
                          {sub.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  <Button
                    key={link.path}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'text.primary',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      px: 1.2,
                      borderBottom: isActive(link.path) ? '3px solid #ff0000' : '3px solid transparent',
                      borderRadius: 0,
                      '&:hover': {
                        borderBottom: '3px solid #ff0000',
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                )
              )}
            </Box>

            {/* Menu burger - mobile */}
            <IconButton
              sx={{ display: { xs: 'flex', lg: 'none' } }}
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Menu mobile avec sous-menus */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280 }} role="presentation">
          <List>
            {/* Liens principaux avec sous-menus */}
            {mainNavLinks.map((link) => (
              <Box key={link.path}>
                {link.subLinks ? (
                  <>
                    <ListItem disablePadding>
                      <ListItemButton 
                        onClick={() => handleMobileSubMenuToggle(link.label)}
                        sx={{
                          borderLeft: isActive(link.path) ? '4px solid #ff0000' : '4px solid transparent',
                        }}
                      >
                        <ListItemText primary={link.label} />
                        {mobileSubMenuOpen[link.label] ? <ExpandLess /> : <ExpandMore />}
                      </ListItemButton>
                    </ListItem>
                    <Collapse in={mobileSubMenuOpen[link.label]} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {link.subLinks.map((sub) => (
                          <ListItem 
                            key={sub.path} 
                            disablePadding
                            onClick={() => setMobileOpen(false)}
                          >
                            <ListItemButton 
                              component={RouterLink} 
                              to={sub.path}
                              sx={{ 
                                pl: 4,
                                borderLeft: isActive(sub.path) ? '4px solid #ff0000' : '4px solid transparent',
                                backgroundColor: isActive(sub.path) ? 'rgba(255, 0, 0, 0.08)' : 'transparent',
                              }}
                            >
                              <ListItemText primary={sub.label} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItem disablePadding onClick={() => setMobileOpen(false)}>
                    <ListItemButton 
                      component={RouterLink} 
                      to={link.path}
                      sx={{
                        borderLeft: isActive(link.path) ? '4px solid #ff0000' : '4px solid transparent',
                      }}
                    >
                      <ListItemText primary={link.label} />
                    </ListItemButton>
                  </ListItem>
                )}
              </Box>
            ))}

            {/* Séparateur */}
            <Box sx={{ borderTop: '1px solid #ddd', my: 1 }} />

            {/* Liens de la barre supérieure */}
            {topBarLinks.map((link) => (
              <ListItem key={link.path} disablePadding onClick={() => setMobileOpen(false)}>
                <ListItemButton 
                  component={RouterLink} 
                  to={link.path}
                  sx={{
                    borderLeft: isActive(link.path) ? '4px solid #ff0000' : '4px solid transparent',
                  }}
                >
                  <ListItemText primary={link.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;