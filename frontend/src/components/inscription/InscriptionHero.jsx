import { useState } from 'react';
import { Box, Container, Typography, Button, Collapse } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';

function InscriptionHero() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 340, md: 420 },
        backgroundImage: 'url(/assets/hero/inscription.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%)',
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Typography variant="h4" sx={{ color: '#fff', fontWeight: 800, mb: 3, maxWidth: 500 }}>
            Bienvenue sur votre espace d'inscription
          </Typography>
          <Button
            component={HashLink}
            smooth
            to="/inscription/selection"
            variant="contained"
            color="primary"
            size="large"
            sx={{ fontWeight: 700, mb: 3 }}
          >
            Inscrivez-vous maintenant
          </Button>

          <Box>
            <Button
              onClick={() => setShowInfo(!showInfo)}
              startIcon={<KeyboardArrowDownIcon />}
              sx={{ color: '#fff', textTransform: 'none', fontWeight: 500 }}
            >
              Informations nécessaires à l'enregistrement
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default InscriptionHero;