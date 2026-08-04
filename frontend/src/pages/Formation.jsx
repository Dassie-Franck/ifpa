import { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, InputAdornment, IconButton, CircularProgress, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PageBanner from '../components/common/PageBanner';
import FiliereCard from '../components/filieres/FiliereCard';
import AnimatedSection from '../components/common/AnimatedSection';
import useFetch from '../hooks/useFetch';
import { filiereService } from '../services/filiereService';

function Formation() {
  const [search, setSearch] = useState('');

  const { data: filieres, loading, error } = useFetch(
    () => filiereService.getAll(search),
    [search]
  );

  return (
    <Box>
      <PageBanner image="/assets/banners/formation-banner.jpg" breadcrumbLabel="Formation" />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <AnimatedSection>
          <Typography
            variant="overline"
            display="block"
            sx={{ 
              color: 'text.secondary', 
              letterSpacing: 2, 
              mb: 1,
              textAlign: 'center' //  Correction : textAlign dans sx
            }}
          >
            CHOISIR SA FORMATION
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 800, 
              mb: 5,
              textAlign: 'center' //  Correction : textAlign dans sx
            }}
          >
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

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            Impossible de charger les filières pour le moment. Veuillez réessayer plus tard.
          </Alert>
        )}

        {!loading && !error && filieres?.length === 0 && (
          <Typography 
            sx={{ 
              textAlign: 'center', // Correction : textAlign dans sx
              color: 'text.secondary', 
              py: 4 
            }}
          >
            Aucune filière ne correspond à votre recherche.
          </Typography>
        )}

        {!loading && !error && filieres?.length > 0 && (
          <Grid container spacing={3}>
            {filieres.map((filiere, index) => (
              <Grid item xs={12} sm={6} md={4} key={filiere.id}>
                <AnimatedSection delay={index * 0.1}>
                  <FiliereCard
                    title={filiere.titre}
                    image={filiere.image_couverture || '/assets/filieres/placeholder.jpg'}
                    link={`/formation/${filiere.slug}`}
                  />
                </AnimatedSection>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <AnimatedSection direction="none">
        <Box sx={{ bgcolor: 'primary.main', py: 4 }}>
          <Container maxWidth="sm">
            <TextField
              fullWidth
              placeholder="Rechercher une formation..."
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                bgcolor: '#fff',
                borderRadius: 1,
                '& fieldset': { border: 'none' },
              }}
              // Correction : InputProps correctement placé sur TextField
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton 
                        sx={{ 
                          bgcolor: 'primary.dark', 
                          color: '#fff', 
                          borderRadius: 1, 
                          '&:hover': { bgcolor: 'primary.dark' } 
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              }}
            />
          </Container>
        </Box>
      </AnimatedSection>
    </Box>
  );
}

export default Formation;