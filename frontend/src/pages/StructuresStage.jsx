import { Box, Container, Typography, Grid, CircularProgress, Alert } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import StructureCard from '../components/partenariats/StructureCard';
import PartnerTestimonials from '../components/partenariats/PartnerTestimonials';
import BecomePartnerSection from '../components/partenariats/BecomePartnerSection';
import useFetch from '../hooks/useFetch';
import { contentService } from '../services/contentService';

function StructuresStage() {
  const { data: partenariats, loading, error } = useFetch(() => contentService.getPartenariats(), []);

  return (
    <Box>
      <PageBanner
        image="/assets/banners/company.png"
        breadcrumbLabel="Structures de stage partenaires"
      />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="overline" display="block" textAlign="center" sx={{ color: 'text.secondary', letterSpacing: 2, mb: 1 }}>
          NOS PARTENAIRES
        </Typography>
        <Typography variant="h4" textAlign="center" sx={{ fontWeight: 800, mb: 2 }}>
          Structures de stage partenaires
        </Typography>
        <Typography textAlign="center" sx={{ color: 'text.secondary', maxWidth: 700, mx: 'auto', mb: 5 }}>
          Depuis sa création, l'IFPA a tissé des liens forts avec un réseau de structures de
          santé qui accueillent chaque année nos étudiants en stage pratique, contribuant
          directement à leur professionnalisation. 
        </Typography>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && <Alert severity="error">Impossible de charger les partenaires pour le moment.</Alert>}

        {!loading && !error && partenariats?.length === 0 && (
          <Typography textAlign="center" sx={{ color: 'text.secondary', py: 4 }}>
            Nos partenariats seront bientôt présentés ici.
          </Typography>
        )}

        {!loading && !error && partenariats?.length > 0 && (
          <Grid container spacing={3}>
            {partenariats.map((structure, index) => (
              <Grid item xs={12} sm={6} md={3} key={structure.id}>
                <StructureCard structure={structure} delay={index * 0.08} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {!loading && !error && partenariats?.length > 0 && (
        <PartnerTestimonials partenariats={partenariats} />
      )}

      <BecomePartnerSection />
    </Box>
  );
}

export default StructuresStage;