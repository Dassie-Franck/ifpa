import { Box, Container, Typography, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion } from 'framer-motion';

// Instructions pratiques pour le candidat (§6.4/§6.5)
const instructions = [
  "Veillez à ce que vos documents scannés soient lisibles (format PDF ou JPG, moins de 5 Mo par fichier)",
  "Munissez-vous d'un compte Mobile Money actif pour le règlement des frais de dossier",
  "Renseignez une adresse email valide : elle servira à toutes les communications liées à votre dossier",
  "Conservez précieusement votre référence de dossier, envoyée par SMS et par email après paiement",
  "Vous pouvez suivre l'état d'avancement de votre dossier à tout moment depuis votre espace de suivi",
];

function InstructionsComplement() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 3 }}>
            <ChevronRightIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
              Instructions
            </Typography>
          </Stack>

          <Stack spacing={1.2} sx={{ mb: 5 }}>
            {instructions.map((text, index) => (
              <Typography key={index} variant="body2" sx={{ color: 'text.secondary' }}>
                • {text}
              </Typography>
            ))}
          </Stack>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <ChevronRightIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
              Complément d'informations
            </Typography>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Cette application vous permettra de suivre votre candidature, d'accéder à l'historique
            de vos échanges avec l'administration et de recevoir des notifications sur l'avancement
            de votre dossier.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}

export default InstructionsComplement;