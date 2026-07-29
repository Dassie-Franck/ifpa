import { useState } from 'react';
import { Box, Container, Typography, Stack, CircularProgress, Alert, Tabs, Tab } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import CommuniqueCard from '../components/institut/CommuniqueCard';
import useFetch from '../hooks/useFetch';
import { contentService } from '../services/contentService';

const typesFiltres = [
  { value: '', label: 'Tous les communiqués' },
  { value: 'examens', label: 'Examens' },
  { value: 'inscriptions', label: 'Inscriptions' },
  { value: 'recrutement', label: 'Recrutement' },
  { value: 'activite_campus', label: 'Activités campus' },
  { value: 'annonce_generale', label: 'Annonces générales' },
];

function EspacePresse() {
  const [type, setType] = useState('');
  const { data: communiques, loading, error } = useFetch(() => contentService.getEspacePresse(type), [type]);

  return (
    <Box>
      <PageBanner image="/assets/banners/banner-site.jpg" breadcrumbLabel="Espace presse" />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
          Espace presse
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>
          Retrouvez ici tous les communiqués officiels de l'IFPA : dates d'examens, périodes
          d'inscription, offres de recrutement et activités organisées sur nos campus.
        </Typography>

        <Tabs
          value={type}
          onChange={(e, val) => setType(val)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 4 }}
        >
          {typesFiltres.map((t) => (
            <Tab key={t.value} label={t.label} value={t.value} />
          ))}
        </Tabs>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {error && <Alert severity="error">Impossible de charger les communiqués.</Alert>}

        {!loading && !error && communiques?.length === 0 && (
          <Typography sx={{ color: 'text.secondary', textAlign: 'center', py: 6 }}>
            Aucun communiqué disponible pour le moment.
          </Typography>
        )}

        <Stack spacing={2}>
          {communiques?.map((communique, index) => (
            <CommuniqueCard key={communique.id} communique={communique} delay={index * 0.06} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

export default EspacePresse;