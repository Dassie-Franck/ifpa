import { Box, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';

function ScolariteTab({ frais, modalites }) {
  return (
    <Box>
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <Box sx={{ bgcolor: '#f0f0f0', px: 3, py: 2, mb: 3 }}>
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Scolarité
          </Typography>
        </Box>
      </motion.div>

      <Stack spacing={3}>
        <Box>
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Frais de formation</Typography>
          <Typography sx={{ color: 'primary.main', fontWeight: 800, fontSize: '1.5rem' }}>
            {frais ? `${Number(frais).toLocaleString('fr-FR')} FCFA` : 'Non communiqué'}
          </Typography>
        </Box>

        {modalites && (
          <Box>
            <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Modalités de paiement</Typography>
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{modalites}</Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
}

export default ScolariteTab;