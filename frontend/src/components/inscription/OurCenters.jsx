import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';

// Puce losange orange réutilisée dans plusieurs blocs de l'espace inscription
function DiamondBullet() {
  return (
    <Box
      sx={{
        width: 7,
        height: 7,
        bgcolor: 'primary.main',
        transform: 'rotate(45deg)',
        flexShrink: 0,
        mt: 0.8,
      }}
    />
  );
}

// Zones de candidature et campus/antennes de l'IFPA — à ajuster avec les vraies données
const zones = ['Zone Cameroun'];
const sites = ['Campus Principal'];

function OurCenters() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
            <Box sx={{ width: 8, height: 8, bgcolor: 'primary.main', transform: 'rotate(45deg)' }} />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Nos centres et sites
            </Typography>
          </Stack>
        </motion.div>

        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Box
                component="img"
                src="/assets/campus/campus1.jpg"
                alt="Centres et sites IFPA"
                sx={{ width: '50%', borderRadius: 100 }}
              />
            </motion.div>
          </Grid>

          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <DiamondBullet />
                <Typography sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Le dépôt de dossier est ouvert dans une  zones :
                </Typography>
              </Stack>
              <Stack spacing={0.5} sx={{ pl: 3, mb: 3 }}>
                {zones.map((zone) => (
                  <Typography key={zone} variant="body2" sx={{ color: 'text.secondary' }}>
                    • {zone}
                  </Typography>
                ))}
              </Stack>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
            >
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
                <DiamondBullet />
                <Typography sx={{ fontWeight: 700, color: 'primary.main' }}>
                  Avec nos différents sites :
                </Typography>
              </Stack>
              <Stack spacing={0.5} sx={{ pl: 3 }}>
                {sites.map((site) => (
                  <Typography key={site} variant="body2" sx={{ color: 'text.secondary' }}>
                    • {site}
                  </Typography>
                ))}
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default OurCenters;