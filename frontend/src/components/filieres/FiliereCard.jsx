import { Box, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Carte filière : image + bandeau titre semi-transparent, réutilisée sur
// la page Formation (§6.3) et potentiellement ailleurs (accueil, admission).
function FiliereCard({ title, image, link }) {
  return (
    <Box
      component={RouterLink}
      to={link}
      sx={{
        position: 'relative',
        display: 'block',
        height: 220,
        overflow: 'hidden',
        textDecoration: 'none',
        borderRadius: 1,
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        '&:hover img': { transform: 'scale(1.08)' },
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.5s ease',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          left: '8%',
          right: '8%',
          top: '50%',
          transform: 'translateY(-50%)',
          bgcolor: 'rgba(230,230,230,0.92)',
          textAlign: 'center',
          py: 2,
          px: 1.5,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 800, color: '#1a1a1a', textTransform: 'uppercase', letterSpacing: 0.5 }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

export default FiliereCard;