import { Box, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';

// Contenu de l'onglet "Cursus" — paragraphes détaillant la filière (§6.3)
function CursusTab({ paragraphs }) {
  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ bgcolor: '#f0f0f0', px: 3, py: 2, mb: 3 }}>
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Le Cursus
          </Typography>
        </Box>
      </motion.div>

      <Stack spacing={2.5}>
        {paragraphs.map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Typography sx={{ color: 'text.secondary', lineHeight: 1.9 }}>{text}</Typography>
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}

export default CursusTab;