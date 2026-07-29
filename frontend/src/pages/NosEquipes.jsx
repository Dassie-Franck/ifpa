import { Box, CircularProgress, Alert, Container, Typography } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import TeamSection from '../components/institut/TeamSection';
import useFetch from '../hooks/useFetch';
import { contentService } from '../services/contentService';

function NosEquipes() {
  const { data: membres, loading, error } = useFetch(() => contentService.getEquipe(), []);

  return (
    <Box>
      <PageBanner image="/assets/hero/equipes.jpg" breadcrumbLabel="Nos équipes" />

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && (
        <Container maxWidth="sm" sx={{ py: 8 }}>
          <Alert severity="error">Impossible de charger l'équipe pour le moment.</Alert>
        </Container>
      )}

      {!loading && !error && (!membres || membres.length === 0) && (
        <Container maxWidth="sm" sx={{ py: 8, textAlign: 'center' }}>
          <Typography sx={{ color: 'text.secondary' }}>
            L'équipe sera bientôt présentée ici.
          </Typography>
        </Container>
      )}

      {!loading && !error && membres?.length > 0 && (
  <TeamSection campusName="" members={membres.map((m) => ({
    name: m.nom_complet,
    role: m.titre,
    email: m.email,
    photo: m.photo,
  }))} />
)}
    </Box>
  );
}

export default NosEquipes;