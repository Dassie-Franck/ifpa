import { Box, Container, Typography, Grid, Button, CircularProgress } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import { contentService } from '../../services/contentService';
import SectionTitle from '../common/SectionTitle';

function FicheInscriptionDownloads() {
  const { data: documents, loading } = useFetch(
    () => contentService.getDocumentsInstitutionnels(),
    []
  );

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={24} color="primary" />
      </Box>
    );
  }

  if (!documents?.fiche_inscription_vierge && !documents?.fiche_inscription_modele) {
    return null;
  }

  return (
    <Box sx={{ py: 8, bgcolor: '#fafafa' }}>
      <Container maxWidth="md">
        <SectionTitle label="DOCUMENT À FOURNIR" title="Fiche d'inscription" />

        <Grid container spacing={3}>
          {documents.fiche_inscription_vierge && (
            <Grid item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  sx={{
                    border: '1px solid #eee',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                  }}
                >
                  <DescriptionIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1.5 }} />
                  <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                    Fiche d'inscription vierge
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    À télécharger, imprimer et remplir à la main pour la constitution de votre
                    dossier physique.
                  </Typography>
                  <Button
                    href={documents.fiche_inscription_vierge}
                    target="_blank"
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    fullWidth
                    sx={{ fontWeight: 700 }}
                  >
                    Télécharger
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          )}

          {documents.fiche_inscription_modele && (
            <Grid item xs={12} sm={6}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Box
                  sx={{
                    border: '1px solid #eee',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                  }}
                >
                  <VisibilityIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1.5 }} />
                  <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
                    Modèle de fiche remplie
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    Un exemple de fiche correctement remplie, à consulter comme guide avant de
                    compléter la vôtre.
                  </Typography>
                  <Button
                    href={documents.fiche_inscription_modele}
                    target="_blank"
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    fullWidth
                    sx={{ fontWeight: 700 }}
                  >
                    Consulter le modèle
                  </Button>
                </Box>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}

export default FicheInscriptionDownloads;