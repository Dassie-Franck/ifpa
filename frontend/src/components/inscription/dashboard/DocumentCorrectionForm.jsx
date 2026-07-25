import { useState } from 'react';
import { Box, Typography, Grid, Alert, Button, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import DocumentUploadField from '../form/DocumentUploadField';
import { candidatureService } from '../../../services/candidatureService';

const typeLabels = {
  photo_identite: "Photo d'identité",
  acte_naissance: 'Acte de naissance',
  diplome: 'Diplôme',
  certificat_medical: 'Certificat médical',
};

// Affiche uniquement les documents marqués invalides (valide === false) et permet
// de les remplacer avant de renvoyer le dossier à l'équipe admissions.
function DocumentCorrectionForm({ candidature, onSuccess }) {
  const [files, setFiles] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const documentsInvalides = candidature.documents.filter((doc) => doc.valide === false);

  const setFile = (type) => (file) => {
    setFiles((prev) => ({ ...prev, [type]: file }));
  };

  const allFilesProvided = documentsInvalides.every((doc) => files[doc.type]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      await candidatureService.resoumettre(candidature.id, files);
      onSuccess();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Impossible d'envoyer votre dossier corrigé. Veuillez réessayer."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (documentsInvalides.length === 0) {
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <Box sx={{ border: '1px solid #f3d3d3', bgcolor: '#fef7f7', borderRadius: 1, p: 3, mt: 2 }}>
        <Typography sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
          Documents à corriger
        </Typography>

        {candidature.motif_rejet && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {candidature.motif_rejet}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={2}>
          {documentsInvalides.map((doc) => (
            <Grid item xs={12} sm={6} key={doc.id}>
              <DocumentUploadField
                label={typeLabels[doc.type] || doc.type}
                required
                file={files[doc.type]}
                onFileChange={setFile(doc.type)}
              />
            </Grid>
          ))}
        </Grid>

        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!allFilesProvided || submitting}
          sx={{ fontWeight: 700, mt: 3 }}
        >
          {submitting ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Renvoyer mon dossier'}
        </Button>
      </Box>
    </motion.div>
  );
}

export default DocumentCorrectionForm;