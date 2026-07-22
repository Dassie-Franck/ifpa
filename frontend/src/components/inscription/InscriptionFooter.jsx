import { Box, Container, Grid, Typography, Stack, Link, Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Link as RouterLink } from 'react-router-dom';

// Contacts par campus/antenne (§6.4) — à ajuster avec les vrais numéros de l'IFPA
const contacts = [
  { label: 'Campus Principal', phone: '+237 6XX XXX XXX' },
  { label: 'Antenne 2', phone: '+242 0XX XXX XXX' },
];

const navigation = [
  { label: 'Accueil', path: '/inscription' },
  { label: 'Inscription', path: '/inscription/formulaire' },
  { label: 'FAQ', path: '/inscription/faq' },
];

function InscriptionFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Box component="footer" sx={{ bgcolor: '#2B2B2B', color: '#fff', pt: 5, pb: 3, position: 'relative' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="/assets/logo-ifpa-white.png"
              alt="Logo IFPA"
              sx={{ height: 40, mb: 2 }}
            />
            <Typography variant="body2" sx={{ opacity: 0.75, lineHeight: 1.8 }}>
              Institut de formation professionnelle formant des professionnels de santé compétents
              et humainement responsables. L'IFPA associe acquisition des connaissances, pratique
              hospitalière et développement humain.
            </Typography>
          </Grid>

          <Grid item xs={6} md={3.5}>
            <Typography
              variant="caption"
              sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1, display: 'block', mb: 1.5 }}
            >
              CONTACTS
            </Typography>
            <Stack spacing={1}>
              {contacts.map((contact) => (
                <Stack direction="row" spacing={1} alignItems="center" key={contact.phone}>
                  <WhatsAppIcon sx={{ fontSize: 16, color: '#25D366' }} />
                  <Typography variant="body2" sx={{ opacity: 0.85 }}>
                    {contact.phone}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={3.5}>
            <Typography
              variant="caption"
              sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1, display: 'block', mb: 1.5 }}
            >
              NAVIGATION
            </Typography>
            <Stack spacing={1}>
              {navigation.map((link) => (
                <Link
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  color="inherit"
                  underline="hover"
                  sx={{ opacity: 0.85, fontSize: '0.875rem' }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 4, pt: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
            <Typography variant="caption" sx={{ opacity: 0.6 }}>
              © {new Date().getFullYear()} Institut IFPA — Tous droits réservés
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.4 }}>
              v1.0
            </Typography>
          </Stack>
        </Box>
      </Container>

      {/* Bouton retour en haut */}
      <Fab
        size="small"
        onClick={scrollToTop}
        aria-label="Retour en haut"
        sx={{
          position: 'absolute',
          right: 24,
          bottom: 24,
          bgcolor: 'primary.main',
          color: '#fff',
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
  );
}

export default InscriptionFooter;