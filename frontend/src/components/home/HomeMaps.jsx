// src/components/home/HomeMap.jsx
import { Box, Container, Typography } from '@mui/material';

function HomeMap() {
  return (
    <Box sx={{ bgcolor: 'primary.dark', color: '#fff', py: 6, position: 'relative' }}>
      <Container maxWidth="md">
        <Typography variant="overline" display="block" textAlign="center" sx={{ opacity: 0.8, letterSpacing: 2, mb: 0.5 }}>
          LOCALISATION
        </Typography>
        <Typography variant="h4" textAlign="center" sx={{ fontWeight: 800, mb: 4 }}>
          Où nous trouver
        </Typography>

        {/* ====== CARTE ====== */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingBottom: '56.25%', // 16:9
            height: 0,
            overflow: 'hidden',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.478928870512!2d9.69711649268084!3d4.053680884324629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106113048c0b8ea1%3A0xc56e5c74dec75140!2sDB%20Digital%20Agency!5e0!3m2!1sfr!2scm!4v1785327973927!5m2!1sfr!2scm"
            title="Localisation de notre agence"
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              border: 0,
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2, opacity: 0.8 }}>
          DB Digital Agency – Douala, Cameroun
        </Typography>
      </Container>
    </Box>
  );
}

export default HomeMap; 