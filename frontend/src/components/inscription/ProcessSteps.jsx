import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion } from 'framer-motion';

// Étapes de traitement du dossier (§6.4/§6.5) — remplace le bloc "Horaires de composition"
// du template de référence, adapté au processus IFPA (étude de dossier, pas d'examen écrit)
const steps = [
  { label: 'Dépôt du dossier en ligne' },
  { label: 'Paiement des frais de dossier' },
  { label: "Étude du dossier par l'administration" },
  { label: 'Notification de la décision' },
];

function ProcessSteps() {
  return (
    <Box sx={{ py: 6, bgcolor: '#fafafa' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
            <ChevronRightIcon sx={{ color: 'secondary.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Étapes du dépôt de dossier
            </Typography>
          </Stack>
        </motion.div>

        <Grid container spacing={2}>
          {steps.map((step, index) => (
            <Grid item xs={6} md={3} key={step.label}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    bgcolor: '#fff',
                    border: '1px solid #eee',
                    px: 2,
                    py: 1.8,
                  }}
                >
                  <ChevronRightIcon sx={{ color: 'secondary.main', fontSize: 20, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {index + 1}. {step.label}
                  </Typography>
                </Stack>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProcessSteps;