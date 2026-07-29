import { Box, Typography, Stack } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { motion } from 'framer-motion';

function StructureCard({ structure, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <Box
        sx={{
          border: '1px solid #eee',
          borderRadius: 1,
          p: 3,
          height: '100%',
          textAlign: 'center',
          transition: 'box-shadow 0.25s ease',
          '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },
        }}
      >
        {structure.logo ? (
          <Box
            component="img"
            src={structure.logo}
            alt={structure.nom_structure}
            sx={{ height: 64, maxWidth: '100%', objectFit: 'contain', mb: 2, mx: 'auto', display: 'block' }}
          />
        ) : (
          <Box
            sx={{
              height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center',
              bgcolor: '#f5f5f5', borderRadius: 1, mb: 2, fontWeight: 800, color: 'primary.main',
            }}
          >
            {structure.nom_structure?.charAt(0)}
          </Box>
        )}

        <Typography sx={{ fontWeight: 700, mb: 0.5 }}>{structure.nom_structure}</Typography>

        {structure.ville && (
          <Stack direction="row" spacing={0.5} justifyContent="center" alignItems="center" sx={{ mb: 1 }}>
            <LocationOnIcon sx={{ fontSize: 14, color: 'text.disabled' }} />
            <Typography variant="caption" sx={{ color: 'text.disabled' }}>
              {structure.ville}
            </Typography>
          </Stack>
        )}

        {structure.description && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
            {structure.description}
          </Typography>
        )}

        {structure.nombre_etudiants_accueillis && (
          <Stack direction="row" spacing={0.7} justifyContent="center" alignItems="center">
            <GroupsIcon sx={{ fontSize: 16, color: 'primary.main' }} />
            <Typography variant="caption" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {structure.nombre_etudiants_accueillis} étudiant(s) accueilli(s)
            </Typography>
          </Stack>
        )}
      </Box>
    </motion.div>
  );
}

export default StructureCard;