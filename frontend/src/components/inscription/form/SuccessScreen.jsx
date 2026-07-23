import { Box, Container, Typography, Button, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

function SuccessScreen({ reference }) {
  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'backOut' }}
      >
        <CheckCircleIcon sx={{ fontSize: 80, color: '#2e7d32', mb: 2 }} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
          Votre dossier a bien été transmis !
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1 }}>
          Un identifiant unique vous a été envoyé par SMS et par email :
        </Typography>
        <Box
          sx={{
            display: 'inline-block',
            bgcolor: '#fff5ec',
            border: '1px dashed',
            borderColor: 'primary.main',
            px: 3,
            py: 1,
            borderRadius: 1,
            fontWeight: 800,
            color: 'primary.main',
            mb: 3,
          }}
        >
          {reference}
        </Box>
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>
          Vous pouvez suivre l'avancement de votre dossier à tout moment depuis votre espace de
          suivi, à l'aide de cet identifiant.
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button component={RouterLink} to="/inscription/suivi" variant="contained" sx={{ fontWeight: 700 }}>
            Suivre mon dossier
          </Button>
          <Button component={RouterLink} to="/" variant="outlined" sx={{ fontWeight: 700 }}>
            Retour à l'accueil
          </Button>
        </Stack>
      </motion.div>
    </Container>
  );
}

export default SuccessScreen;