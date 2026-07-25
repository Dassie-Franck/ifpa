import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, Stack } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { motion } from 'framer-motion';
import { candidatureService } from '../../../services/candidatureService';

// Permet de rattacher au compte connecté un dossier déposé avant la création
// du compte, à partir de sa référence (ex: IFPA-AXVA4SLH).
function LinkCandidatureForm({ onSuccess }) {
  const [reference, setReference] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);
    try {
      const result = await candidatureService.lierCandidature(reference.trim().toUpperCase());
      setSuccess(result.message);
      setReference('');
      onSuccess?.();
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Impossible de rattacher ce dossier. Vérifiez la référence saisie.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
      <Box sx={{ border: '1px dashed #ccc', borderRadius: 1, p: 3 }}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <LinkIcon sx={{ color: 'primary.main', fontSize: 20 }} />
          <Typography sx={{ fontWeight: 700 }}>
            Vous avez déjà déposé un dossier ?
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
          Entrez la référence reçue par email (ex: IFPA-AXVA4SLH) pour l'associer à votre compte
          et suivre son évolution ici.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            <TextField
              fullWidth
              size="small"
              placeholder="IFPA-XXXXXXXX"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}
            >
              {submitting ? 'Recherche...' : 'Rattacher'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
}

export default LinkCandidatureForm;