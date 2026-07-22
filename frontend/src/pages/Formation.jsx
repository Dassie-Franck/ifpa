import { Box, Container, Typography, Grid, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PageBanner from '../components/common/PageBanner';
import FiliereCard from '../components/filieres/FiliereCard';
import AnimatedSection from '../components/common/AnimatedSection';

// Filières paramédicales IFPA (§6.3 du cahier des charges)
// Données statiques temporaires — seront remplacées par l'API Laravel (/api/v1/filieres)
const filieres = [
  { title: 'Delegue Medicale', image: '/assets/filieres/delegue-medical.jpg', link: '/formation/delegue-medicale' },
  { title: 'Vendeur en pharmacie', image: '/assets/filieres/vendeur-pharmacie.jpg', link: '/formation/vendeur-pharmacie' },
  { title: 'Auxiliaire de Vie', image: '/assets/filieres/Auxiliare-de-vie.jpg', link: '/formation/auxiliaire-de-vie' },
  { title: 'Assistant en Cabinet Medicale', image: '/assets/filieres/assistant-cabinet.jpg', link: '/formation/assistant-cabinet-medicale' },
  { title: 'Aide Chimiste Biologiste', image: '/assets/filieres/chimiste.jpg', link: '/formation/aide-chimiste-biologiste' },
  
];

function Formation() {
  return (
    <Box>
      <PageBanner image="/assets/banners/formation-banner1.jpg" breadcrumbLabel="Formation" />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <AnimatedSection>
          <Typography
            variant="overline"
            display="block"
            textAlign="center"
            sx={{ color: 'text.secondary', letterSpacing: 2, mb: 1 }}
          >
           <center>CHOISIR SA FORMATION</center>
          </Typography>
          <Typography variant="h4" textAlign="center" sx={{ fontWeight: 800, mb: 5 }}>
            Nos{' '}
            <Box component="span" sx={{ position: 'relative' }}>
              filières
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -4,
                  left: '20%',
                  width: '60%',
                  height: 3,
                  bgcolor: 'primary.main',
                }}
              />
            </Box>
          </Typography>
        </AnimatedSection>

        <Grid container spacing={2}>
          {filieres.map((filiere, index) => (
            <Grid item xs={12} sm={6} md={4} key={filiere.link} sx={{ display: 'flex' }}>
              <AnimatedSection delay={index * 0.1} style={{ width: '100%' }}>
                <FiliereCard {...filiere} />
              </AnimatedSection>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Bandeau rouge - barre de recherche */}
      <AnimatedSection direction="none">
        <Box sx={{ bgcolor: 'primary.main', py: 4 }}>
          <Container maxWidth="sm">
            <TextField
              fullWidth
              placeholder="Rechercher une formation..."
              variant="outlined"
              sx={{
                bgcolor: '#fff',
                borderRadius: 1,
                '& fieldset': { border: 'none' },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton sx={{ bgcolor: 'primary.dark', color: '#fff', borderRadius: 1, '&:hover': { bgcolor: 'primary.dark' } }}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Container>
        </Box>
      </AnimatedSection>
    </Box>
  );
}

export default Formation;