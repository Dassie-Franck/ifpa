import { useState } from 'react';
import { Box, Typography, Chip, Stack, Button, Collapse } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import DocumentCorrectionForm from './DocumentCorrectionForm';

const statutConfig = {
  soumis: { label: 'En attente d\'étude', color: 'warning' },
  dossier_valide: { label: 'Paiement requis', color: 'info' },
  rejete: { label: 'Rejeté — action requise', color: 'error' },
  paiement_recu: { label: 'Paiement reçu', color: 'success' },
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
      <Box sx={{ border: '1px solid #eee', borderRadius: 1, p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
          gap={2}
        >
          <Box>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Réf. {candidature.reference}
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
              {candidature.filiere}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              Déposé le {new Date(candidature.created_at).toLocaleDateString('fr-FR')}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center">
            <Chip label={config.label} color={config.color} size="small" sx={{ fontWeight: 600 }} />

            {candidature.statut === 'rejete' && (
              <Button
                onClick={() => setShowCorrection((prev) => !prev)}
                variant="contained"
                color="error"
                size="small"
                sx={{ fontWeight: 600 }}
              >
                {showCorrection ? 'Fermer' : 'Corriger mon dossier'}
              </Button>
            )}

            {candidature.statut !== 'rejete' && (
              <Button
                component={RouterLink}
                to={`/inscription/suivi/${candidature.token_suivi}`}
                variant="outlined"
                size="small"
                sx={{ fontWeight: 600 }}
              >
                Voir le détail
              </Button>
            )}
          </Stack>
        </Stack>

        <Collapse in={showCorrection}>
          <DocumentCorrectionForm candidature={candidature} onSuccess={handleCorrectionSuccess} />
        </Collapse>
      </Box>
    </motion.div>
  );
}

export default CandidatureCard;