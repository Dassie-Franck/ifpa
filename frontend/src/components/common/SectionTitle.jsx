import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

// Label + titre centré avec petit trait rouge en dessous — motif répété
// sur toutes les sections du site (Admission, Formation, Institut...)
function SectionTitle({ label, title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Box textAlign="center" sx={{ mb: 4 }}>
        <Typography
          variant="overline"
          display="block"
          sx={{ color: 'text.secondary', letterSpacing: 2, mb: 1 }}
        >
          {label}
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, display: 'inline-block' }}>
          {title}
        </Typography>
        <Box sx={{ width: 50, height: 3, bgcolor: 'primary.main', mx: 'auto', mt: 1 }} />
      </Box>
    </motion.div>
  );
}

export default SectionTitle;