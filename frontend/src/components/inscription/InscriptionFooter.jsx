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
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: '#2B2B2B', 
        color: '#fff', 
        pt: { xs: 4, sm: 5 }, 
        pb: { xs: 2, sm: 3 }, 
        position: 'relative',
        width: '100%',
        overflow: 'hidden'
      }}
    >
      <Container 
        maxWidth={false} 
        sx={{ 
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          maxWidth: '1400px',
          margin: '0 auto'
        }}
      >
        <Grid container spacing={{ xs: 3, sm: 4 }}>
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="/assets/new_logo.jpeg"
              alt="Logo IFPA"
              sx={{ 
                height: { xs: 32, sm: 36, md: 40 }, 
                mb: { xs: 1.5, sm: 2 } 
              }}
            />
            <Typography 
              variant="body2" 
              sx={{ 
                opacity: 0.75, 
                lineHeight: { xs: 1.6, sm: 1.8 },
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}
            >
              Institut de formation professionnelle formant des professionnels de santé compétents
              et humainement responsables. L'IFPA associe acquisition des connaissances, pratique
              hospitalière et développement humain.
            </Typography>
          </Grid>

          <Grid item xs={6} md={3.5}>
            <Typography
              variant="caption"
              sx={{ 
                color: 'primary.main', 
                fontWeight: 700, 
                letterSpacing: 1, 
                display: 'block', 
                mb: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.65rem', sm: '0.75rem' }
              }}
            >
              CONTACTS
            </Typography>
            <Stack spacing={1}>
              {contacts.map((contact) => (
                <Stack 
                  direction="row" 
                  spacing={1} 
                  alignItems="center" 
                  key={contact.phone}
                  sx={{
                    flexWrap: 'wrap',
                    wordBreak: 'break-word'
                  }}
                >
                  <WhatsAppIcon sx={{ 
                    fontSize: { xs: 14, sm: 16 }, 
                    color: '#25D366',
                    flexShrink: 0
                  }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      opacity: 0.85,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      wordBreak: 'break-word'
                    }}
                  >
                    {contact.phone}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={6} md={3.5}>
            <Typography
              variant="caption"
              sx={{ 
                color: 'primary.main', 
                fontWeight: 700, 
                letterSpacing: 1, 
                display: 'block', 
                mb: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.65rem', sm: '0.75rem' }
              }}
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
                  sx={{ 
                    opacity: 0.85, 
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    display: 'inline-block',
                    width: 'fit-content'
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Box 
          sx={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            mt: { xs: 3, sm: 4 }, 
            pt: { xs: 1.5, sm: 2 }
          }}
        >
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems={{ xs: 'center', sm: 'center' }}
            spacing={{ xs: 1, sm: 0 }}
            flexWrap="wrap"
          >
            <Typography 
              variant="caption" 
              sx={{ 
                opacity: 0.6,
                fontSize: { xs: '0.65rem', sm: '0.75rem' },
                textAlign: { xs: 'center', sm: 'left' }
              }}
            >
              © {new Date().getFullYear()} Institut IFPA — Tous droits réservés
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                opacity: 0.4,
                fontSize: { xs: '0.6rem', sm: '0.7rem' }
              }}
            >
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
          position: 'fixed',
          right: { xs: 16, sm: 24 },
          bottom: { xs: 16, sm: 24 },
          bgcolor: 'primary.main',
          color: '#fff',
          '&:hover': { bgcolor: 'primary.dark' },
          zIndex: 1000,
          width: { xs: 40, sm: 48 },
          height: { xs: 40, sm: 48 },
        }}
      >
        <KeyboardArrowUpIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
      </Fab>
    </Box>
  );
}

export default InscriptionFooter;