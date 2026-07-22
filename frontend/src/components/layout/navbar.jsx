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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link as RouterLink } from 'react-router-dom';

// Bandeau secondaire (au-dessus du header) - §7.2 du cahier des charges
const topBarLinks = [
  { label: 'Moodle', path: '/espace-apprenant' },
  { label: 'Actualité', path: '/actualites' },
  { label: 'Alumni', path: '/alumni' },
  { label: 'Faire un don', path: '/don' },
  { label: 'Médiathèque', path: '/mediatheque' },
  { label: 'Contact', path: '/contact' },
];

// Menu principal - §7.1 du cahier des charges
const mainNavLinks = [
  {
    label: "L'INSTITUT",
    path: '/institut',
    subLinks: [
      { label: 'Qui sommes-nous ?', path: '/institut/qui-sommes-nous' },
      { label: 'Nos approches pédagogiques', path: '/institut/approches-pedagogiques' },
      { label: 'Nos équipes', path: '/institut/equipes' },
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
      { label: 'Opportunités professionnelles', path: '/partenariats/opportunites' },
    ],
  },
  {
    label: 'VIE AU CAMPUS',
    path: '/vie-au-campus',
    subLinks: [
      { label: 'Présentation du/des site(s)', path: '/vie-au-campus/presentation' },
    ],
  },
  { label: 'ENTREPRISES', path: '/recruteurs' },
  { label: 'FONDS DE SOLIDARITÉ', path: '/fonds-de-solidarite' },
];

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleOpenSubMenu = (event, label) => {
    setAnchorEl(event.currentTarget);
    setOpenSubMenu(label);
  };

  const handleCloseSubMenu = () => {
    setAnchorEl(null);
    setOpenSubMenu(null);
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

      {/* Menu mobile */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280 }} role="presentation">
          <List>
            {[...mainNavLinks, ...topBarLinks].map((link) => (
              <ListItem key={link.path} disablePadding onClick={() => setMobileOpen(false)}>
                <ListItemButton component={RouterLink} to={link.path}>
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