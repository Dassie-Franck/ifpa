import { useState } from 'react';
import { Box, Typography, Chip, Stack, Button, Collapse } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import DocumentCorrectionForm from './DocumentCorrectionForm';

const statutConfig = {
  soumis: { label: "En attente d'étude", color: 'warning' },
  paiement_en_attente: { label: 'Paiement requis', color: 'info' },
  rejete: { label: 'Rejeté — action requise', color: 'error' },
  dossier_valide: { label: 'Dossier validé', color: 'success' },
  expire: { label: 'Expiré', color: 'default' },
  admis: { label: 'Admis', color: 'success' },
};

function CandidatureCard({ candidature, delay = 0, onRefresh }) {
  const [showCorrection, setShowCorrection] = useState(false);
  const config = statutConfig[candidature.statut] || { label: candidature.statut, color: 'default' };

  const handleCorrectionSuccess = () => {
    setShowCorrection(false);
    onRefresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Box
        sx={{
          border: '1px solid #eee',
          borderRadius: 2,
          p: { xs: 2, sm: 3 },
          bgcolor: 'background.paper',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'box-shadow 0.2s',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
          },
        }}
      >
        {/* En-tête : informations principales + statut */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          spacing={{ xs: 1.5, sm: 2 }}
          flexWrap="wrap"
        >
          <Box>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}
            >
              Réf. {candidature.reference}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, fontSize: { xs: '1rem', sm: '1.05rem' } }}
            >
              {candidature.filiere}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.disabled', display: 'block', mt: 0.25 }}
            >
              Déposé le {new Date(candidature.created_at).toLocaleDateString('fr-FR')}
            </Typography>
          </Box>

          {/* Statut + actions (regroupés) */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 1.5 }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            sx={{ width: { xs: '100%', sm: 'auto' } }}
          >
            <Chip
              label={config.label}
              color={config.color}
              size="small"
              sx={{ fontWeight: 600, alignSelf: 'flex-start' }}
            />

            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              useFlexGap
              sx={{ justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}
            >
              {candidature.statut === 'rejete' && (
                <Button
                  onClick={() => setShowCorrection((prev) => !prev)}
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                >
                  {showCorrection ? 'Fermer' : 'Corriger'}
                </Button>
              )}

              {candidature.statut !== 'rejete' && (
                <Button
                  component={RouterLink}
                  to={`/inscription/suivi/${candidature.token_suivi}`}
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                >
                  Détail
                </Button>
              )}

              <Button
                href={`http://localhost:8000/api/v1/candidatures/suivi/${candidature.token_suivi}/fiche-pdf`}
                target="_blank"
                variant="text"
                size="small"
                sx={{ fontWeight: 600, fontSize: '0.75rem' }}
              >
                PDF
              </Button>
            </Stack>
          </Stack>
        </Stack>

        {/* Formulaire de correction (affiché en dessous) */}
        <Collapse in={showCorrection} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 3 }}>
            <DocumentCorrectionForm
              candidature={candidature}
              onSuccess={handleCorrectionSuccess}
            />
          </Box>
        </Collapse>
        
      </Box>
    </motion.div>
  );
}

export default CandidatureCard;