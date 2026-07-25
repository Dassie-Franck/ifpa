import { useState } from 'react';
import { Box, Container, Typography, Breadcrumbs, Link, CircularProgress, Alert } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FiliereTabs from '../components/filieres/FiliereTabs';
import CursusTab from '../components/filieres/CursusTab';
import ProgrammeTab from '../components/filieres/ProgrammeTab';
import DebouchesTab from '../components/filieres/DebouchesTab';
import ScolariteTab from '../components/filieres/ScolariteTab';
import CampusTab from '../components/filieres/CampusTab';
import ContactsTab from '../components/filieres/ContactsTab';
import useFetch from '../hooks/useFetch';
import { filiereService } from '../services/filiereService';

function FiliereDetail() {
  const { slug } = useParams();
  const [tabValue, setTabValue] = useState(0);

  const { data: filiere, loading, error } = useFetch(
    () => filiereService.getBySlug(slug),
    [slug]
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error || !filiere) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Alert severity="error">Cette filière est introuvable ou n'est plus disponible.</Alert>
      </Container>
    );
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Breadcrumbs separator="»" sx={{ fontSize: '0.85rem' }}>
          <Link component={RouterLink} to="/formation" underline="hover" color="primary">
            Formation
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>
            {filiere.titre}
          </Typography>
        </Breadcrumbs>
      </Container>

      <Container maxWidth="lg" sx={{ textAlign: 'center', py: 4 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2 }}>
            NOS FORMATIONS
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {filiere.titre}
          </Typography>
        </motion.div>
      </Container>

      <FiliereTabs value={tabValue} onChange={(e, val) => setTabValue(val)} />

      <Container maxWidth="md" sx={{ py: 6 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tabValue}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabValue === 0 && <CursusTab paragraphs={[filiere.resume].filter(Boolean)} />}
            {tabValue === 1 && <ProgrammeTab content={filiere.programme_pedagogique} />}
            {tabValue === 2 && <DebouchesTab content={filiere.debouches} />}
            {tabValue === 3 && <ScolariteTab frais={filiere.frais_formation} modalites={filiere.modalites_paiement} />}
            {tabValue === 4 && <CampusTab />}
            {tabValue === 5 && <ContactsTab />}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
}

export default FiliereDetail;