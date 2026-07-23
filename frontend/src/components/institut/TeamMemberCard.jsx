import { Box, Typography, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';

// Carte membre d'équipe — photo (optionnelle), nom, fonction, email
function TeamMemberCard({ name, role, email, photo, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <Box
        sx={{
          bgcolor: '#fff',
          border: '1px solid #eee',
          borderRadius: 1,
          overflow: 'hidden',
          height: '100%',
          transition: 'box-shadow 0.25s ease',
          '&:hover': { boxShadow: '0 6px 20px rgba(0,0,0,0.08)' },
        }}
      >
        <Box
          sx={{
            height: 180,
            bgcolor: '#f0f0f0',
            backgroundImage: photo ? `url(${photo})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 700, textTransform: 'uppercase' }}>
            {role}
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
            {name}
          </Typography>
          <Stack direction="row" spacing={0.8} alignItems="center">
            <EmailIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
            <Typography
              component="a"
              href={`mailto:${email}`}
              variant="caption"
              sx={{ color: 'text.secondary', textDecoration: 'none', wordBreak: 'break-all' }}
            >
              {email}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
}

export default TeamMemberCard;