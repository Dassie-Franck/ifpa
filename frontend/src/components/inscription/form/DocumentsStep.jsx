import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import FiliereSelector from './FiliereSelector';
import DocumentUploadField from './DocumentUploadField';

function DocumentsStep({ formData, setFormData }) {
  const setFile = (field) => (file) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
  };

  return (
    <Box>
      <Box sx={{ position: 'relative', pl: 3, mb: 3 }}>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 4,
            bottom: 4,
            width: 2,
            borderLeft: '2px dashed',
            borderColor: 'primary.main',
          }}
        />
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: 'primary.main', textDecoration: 'underline', mb: 1.5 }}
        >
          Filière &amp; pièces justificatives
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Choisissez la filière pour laquelle vous déposez votre dossier, puis téléversez les
          pièces justificatives demandées. Les fichiers acceptés sont au format PDF, JPG ou PNG
          (5 Mo maximum par fichier).
        </Typography>
      </Box>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Filière choisie</Typography>
        <FiliereSelector
          selectedId={formData.filiereId}
          onSelect={(filiereId, filiereTitre) =>
            setFormData((prev) => ({ ...prev, filiereId, filiereTitre }))
          }
        />
      </motion.div>

      <Box sx={{ mt: 4 }}>
        <Typography sx={{ fontWeight: 700, mb: 2 }}>Pièces justificatives</Typography>
        <Grid container spacing={2.5}>
          <Grid item xs={12} sm={6}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <DocumentUploadField
                label="Demande d'admission manuscrite"
                required
                file={formData.demandeManuscrite}
                onFileChange={setFile('demandeManuscrite')}
                accept={{ 'image/*': [], 'application/pdf': [] }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <DocumentUploadField
                label="Diplôme / Relevé de notes / Bordereau de réussite"
                required
                file={formData.diplomeReleveNotes}
                onFileChange={setFile('diplomeReleveNotes')}
                accept={{ 'image/*': [], 'application/pdf': [] }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <DocumentUploadField
                label="Acte de naissance"
                required
                file={formData.acteNaissance}
                onFileChange={setFile('acteNaissance')}
                accept={{ 'image/*': [], 'application/pdf': [] }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <DocumentUploadField
                label="Carte nationale d'identité"
                required
                file={formData.carteIdentite}
                onFileChange={setFile('carteIdentite')}
                accept={{ 'image/*': [], 'application/pdf': [] }}
              />
            </motion.div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <DocumentUploadField
                label="Photo d'identité (4x4)"
                required
                file={formData.photoIdentite}
                onFileChange={setFile('photoIdentite')}
                accept={{ 'image/*': [] }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DocumentsStep;