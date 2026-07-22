import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function MissionAmbition() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Typography
            variant="overline"
            display="block"
            textAlign="center"
            sx={{ color: 'text.secondary', letterSpacing: 2, mb: 1 }}
          >
            NOTRE MISSION
          </Typography>
          <Typography variant="h4" textAlign="center" sx={{ fontWeight: 800, mb: 1 }}>
            Notre <Box component="span" sx={{ borderBottom: '3px solid', borderColor: 'primary.main' }}>mission</Box>
          </Typography>
          <Typography textAlign="center" sx={{ color: 'text.secondary', mb: 5 }}>
            Former des hommes et des femmes techniquement compétents et humainement responsables
            aux métiers de la santé.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <Typography
            variant="subtitle1"
            textAlign="center"
            sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: 1, mb: 1 }}
          >
            NOTRE AMBITION
          </Typography>
          <Typography textAlign="center" sx={{ color: 'text.secondary' }}>
            Être un acteur de référence dans la formation de professionnels de santé opérationnels
            et soucieux de leur impact auprès des patients et de la société.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}

export default MissionAmbition;