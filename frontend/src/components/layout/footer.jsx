import { Box, Container, Grid, Typography, TextField, Button, Stack, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Colonnes du footer - §7.3 du cahier des charges
const usefulLinks = [
  { label: 'À propos', path: '/institut/qui-sommes-nous' },
  { label: 'Formation', path: '/formation' },
  { label: 'Partenariats & stages', path: '/partenariats' },
  { label: 'Fonds de solidarité', path: '/fonds-de-solidarite' },
];

const studentLinks = [
  { label: 'Vie au campus', path: '/vie-au-campus' },
  { label: "Bureau des étudiants", path: '/vie-au-campus/bureau-etudiants' },
  { label: 'Les clubs', path: '/vie-au-campus/clubs' },
  { label: 'Alumni', path: '/alumni' },
];

const admissionLinks = [
  { label: 'Annales du concours', path: '/admission/annales' },
  { label: "Centres d'examen", path: '/admission/centres-examen' },
  { label: "S'inscrire au concours", path: '/admission' },
  { label: 'Résultats', path: '/admission/resultats' },
];

const mediaLinks = [
  { label: 'Kit de communication', path: '/institut/espace-presse' },
  { label: 'Communiqués de presse', path: '/institut/espace-presse' },
  { label: 'Publications', path: '/institut/espace-presse' },
  { label: 'Médiathèque', path: '/mediatheque' },
];

function Footer() {
  return (
    <Box component="footer">
      <Box sx={{ bgcolor: 'grey.900', color: '#fff', pt: 6, pb: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, borderBottom: '2px solid', borderColor: 'primary.main', display: 'inline-block', pb: 0.5 }}>
                Liens utiles
              </Typography>
              <Stack spacing={1} sx={{ mt: 1.5 }}>
                {usefulLinks.map((link) => (
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

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, borderBottom: '2px solid', borderColor: 'primary.main', display: 'inline-block', pb: 0.5 }}>
                Étudiants
              </Typography>
              <Stack spacing={1} sx={{ mt: 1.5 }}>
                {studentLinks.map((link) => (
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

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, borderBottom: '2px solid', borderColor: 'primary.main', display: 'inline-block', pb: 0.5 }}>
                Concours
              </Typography>
              <Stack spacing={1} sx={{ mt: 1.5, mb: 2 }}>
                {admissionLinks.map((link) => (
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

              {/* Bloc Paiements - Mobile Money */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Paiements
              </Typography>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  component="img"
                  src="/assets/orangeMoney.png"
                  alt="Orange Money"
                  sx={{ height: 50 }}
                />
                <Box
                  component="img"
                  src="/assets/momo.jpg"
                  alt="MTN Mobile Money"
                  sx={{ height: 50 }}
                />
              </Stack>
            </Grid>

            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1.5, borderBottom: '2px solid', borderColor: 'primary.main', display: 'inline-block', pb: 0.5 }}>
                Médias
              </Typography>
              <Stack spacing={1} sx={{ mt: 1.5, mb: 3 }}>
                {mediaLinks.map((link) => (
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

              {/* Bloc Newsletter */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Newsletter
              </Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  placeholder="Votre email"
                  variant="filled"
                  hiddenLabel
                  sx={{
                    bgcolor: '#fff',
                    borderRadius: 1,
                    flex: 1,
                    '& .MuiFilledInput-root': { py: 0 },
                  }}
                />
                <Button variant="contained" color="primary" size="small">
                  S'abonner
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Bandeau copyright */}
      <Box sx={{ bgcolor: 'primary.main', py: 1.5 }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Typography variant="caption" sx={{ color: '#fff', opacity: 0.9 }}>
              © {new Date().getFullYear()} IFPA — Institut de Formation Professionnelle Antonny
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link component={RouterLink} to="/mentions-legales" color="inherit" underline="hover" sx={{ color: '#fff', fontSize: '0.75rem', opacity: 0.9 }}>
                Documents officiels
              </Link>
              <Link component={RouterLink} to="/plan-du-site" color="inherit" underline="hover" sx={{ color: '#fff', fontSize: '0.75rem', opacity: 0.9 }}>
                Plan du site
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover" sx={{ color: '#fff', fontSize: '0.75rem', opacity: 0.9 }}>
                Contact
              </Link>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;