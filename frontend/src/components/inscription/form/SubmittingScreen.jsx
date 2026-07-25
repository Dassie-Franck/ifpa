import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

function SubmittingScreen() {
  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <CircularProgress color="primary" sx={{ mb: 3 }} />
        <Typography sx={{ color: 'text.secondary' }}>
          Envoi de votre dossier en cours, veuillez patienter...
        </Typography>
      </motion.div>
    </Container>
  );
}

export default SubmittingScreen;