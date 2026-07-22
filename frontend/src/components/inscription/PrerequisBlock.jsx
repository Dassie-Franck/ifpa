import { Box, Container, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';

// Pièces et informations nécessaires au dossier de candidature (§6.4 du cahier des charges)
const prerequis = [
  "L'identité du candidat (nom, prénom, date de naissance, dernier établissement fréquenté, niveau d'études)",
  "Le contact téléphonique et l'email du candidat (et des parents/tuteurs si mineur)",
  "Un compte de paiement Mobile Money (Orange Money, MTN Mobile Money) pour le règlement des frais de dossier",
  "Les pièces justificatives à uploader : copie des diplômes, acte de naissance, certificat médical, photo d'identité numérique",
];

function PrerequisBlock() {
  return (
    <Box id="prerequis" sx={{ mt: { xs: -4, md: -6 }, position: 'relative', zIndex: 2, pb: 6 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Box
            sx={{
              bgcolor: '#fff',
              boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
              borderLeft: '4px solid',
              borderColor: 'primary.main',
              p: { xs: 3, md: 5 },
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: 'primary.main', transform: 'rotate(45deg)' }} />
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary' }}>
                Prérequis
              </Typography>
            </Stack>

            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
              Informations nécessaires à l'enregistrement du dossier :
            </Typography>

            <Stack spacing={1} sx={{ pl: 1 }}>
              {prerequis.map((text, index) => (
                <Typography key={index} variant="body2" sx={{ color: 'text.secondary' }}>
                  • {text}
                </Typography>
              ))}
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default PrerequisBlock;