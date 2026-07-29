import { Box, Typography, Chip, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const typeLabels = {
  examens: 'Examens',
  inscriptions: 'Inscriptions',
  recrutement: 'Recrutement',
  activite_campus: 'Activité campus',
  annonce_generale: 'Annonce générale',
};

const typeColors = {
  examens: 'error',
  inscriptions: 'primary',
  recrutement: 'success',
  activite_campus: 'warning',
  annonce_generale: 'default',
};

function CommuniqueCard({ communique, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay }}
    >
      <Box sx={{ border: '1px solid #eee', borderRadius: 1, overflow: 'hidden', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        {communique.image_couverture && (
          <Box
            component="img"
            src={communique.image_couverture}
            alt={communique.titre}
            sx={{ width: { xs: '100%', sm: 200 }, height: { xs: 160, sm: 'auto' }, objectFit: 'cover' }}
          />
        )}
        <Box sx={{ p: 2.5, flex: 1 }}>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            {communique.type_communique && (
              <Chip
                label={typeLabels[communique.type_communique] || communique.type_communique}
                color={typeColors[communique.type_communique] || 'default'}
                size="small"
                sx={{ fontWeight: 600 }}
              />
            )}
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {communique.date_debut && new Date(communique.date_debut).toLocaleDateString('fr-FR', {
                day: '2-digit', month: 'long', year: 'numeric',
              })}
            </Typography>
          </Stack>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {communique.titre}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {communique.description}
          </Typography>
          {(communique.lieu || communique.campus) && (
            <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block', mt: 1 }}>
              📍 {communique.lieu || communique.campus}
            </Typography>
          )}
        </Box>
      </Box>
    </motion.div>
  );
}

export default CommuniqueCard;