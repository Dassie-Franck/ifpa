import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function DebouchesTab({ content }) {
  return (
    <Box>
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <Box sx={{ bgcolor: '#f0f0f0', px: 3, py: 2, mb: 3 }}>
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Débouchés
          </Typography>
        </Box>
      </motion.div>
      {content ? (
       <SafeHtml html={content} sx={{ color: 'text.secondary', lineHeight: 1.9 }} />
      ) : (
        <Typography sx={{ color: 'text.disabled', fontStyle: 'italic' }}>
          Les débouchés professionnels seront bientôt détaillés.
        </Typography>
        
      )}
    </Box>
  );
}

export default DebouchesTab;