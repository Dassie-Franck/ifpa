import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HandshakeIcon from '@mui/icons-material/Handshake';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import GroupsIcon from '@mui/icons-material/Groups';

// Valeurs fondamentales de l'IFPA (adapté du modèle §9 identité/charte) — à valider avec la direction
const values = [
  { label: 'Bienveillance', icon: VolunteerActivismIcon, bg: 'primary.main' },
  { label: 'Rigueur professionnelle', icon: VerifiedUserIcon, bg: 'primary.dark' },
  { label: 'Humanité', icon: FavoriteIcon, bg: 'grey.400', dark: true },
  { label: 'Responsabilité', icon: HandshakeIcon, bg: 'primary.main' },
  { label: 'Excellence', icon: TouchAppIcon, bg: 'primary.dark' },
  { label: 'Esprit d’équipe', icon: GroupsIcon, bg: 'grey.400', dark: true },
];

function OurValues() {
  return (
    <Box sx={{ py: 8, bgcolor: '#fafafa' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="overline"
            display="block"
            textAlign="center"
            sx={{ color: 'text.secondary', letterSpacing: 2, mb: 1 }}
          >
            CE QUE NOUS PRÔNONS
          </Typography>
          <Typography variant="h4" textAlign="center" sx={{ fontWeight: 800, mb: 2 }}>
            Nos valeurs
          </Typography>
          <Typography
            textAlign="center"
            sx={{ color: 'text.secondary', maxWidth: 800, mx: 'auto', mb: 5 }}
          >
            L'IFPA propose des parcours de réussite s'appuyant sur la réalité du terrain
            hospitalier. Cela consiste à permettre un développement professionnel et personnel,
            doté des capacités à s'engager, à s'adapter et à s'ouvrir aux autres, à travers
            l'adhésion aux valeurs fondamentales constituant le socle de nos formations.
          </Typography>
        </motion.div>

        <Grid container spacing={2}>
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Grid item xs={6} sm={4} md={2} key={value.label}>
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -6 }}
                >
                  <Box
                    sx={{
                      bgcolor: value.bg,
                      color: value.dark ? 'text.primary' : '#fff',
                      height: 150,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1.5,
                      px: 1.5,
                      textAlign: 'center',
                    }}
                  >
                    <Icon sx={{ fontSize: 32 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {value.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default OurValues;