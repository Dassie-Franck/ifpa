import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Spécificités / atouts distinctifs de l'IFPA (§5 du cahier des charges) — à valider/enrichir
const specificities = [
  "L'IFPA accompagne financièrement ses étudiants : des facilités de paiement échelonné sont proposées, en tenant compte de la réalité économique des familles.",
  "Une place importante est accordée à l'insertion professionnelle rapide, grâce à un réseau de structures de stage partenaires réparties dans la sous-région.",
  "Un encadrement pédagogique de proximité, assuré par des formateurs expérimentés issus directement du milieu hospitalier.",
  "Le concours d'admission est organisé dans plusieurs centres d'examen, facilitant l'accès aux candidats de zones géographiques variées.",
  "L'IFPA a mis en œuvre des cours de mise à niveau pour accompagner les candidats avant leur entrée en formation.",
  "Des plateaux techniques et laboratoires équipés à la pointe de la technologie, pour une pratique proche des conditions réelles d'exercice.",
];

function OurSpecificities() {
  return (
    <Box sx={{ py: 8 }}>
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
            PARTICULARITÉS
          </Typography>
          <Typography variant="h4" textAlign="center" sx={{ fontWeight: 800, mb: 4 }}>
            Nos <Box component="span" sx={{ borderBottom: '3px solid', borderColor: 'primary.main' }}>spécificités</Box>
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Box
            sx={{
              bgcolor: 'primary.dark',
              backgroundImage:
                'repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 12px)',
              p: { xs: 3, md: 5 },
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={5}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                >
                  <Box
                    component="img"
                    src="/assets/institut/nos-specificites.jpg"
                    alt="Spécificités IFPA"
                    sx={{ width: '100%', borderRadius: 1 }}
                  />
                </motion.div>
              </Grid>

              <Grid item xs={12} md={7}>
                <Typography
                  sx={{ color: '#fff', fontWeight: 700, mb: 2 }}
                >
                  L'Institut est ouvert au plus grand nombre :
                </Typography>
                <Stack spacing={2}>
                  {specificities.map((text, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <FiberManualRecordIcon sx={{ fontSize: 8, color: '#fff', mt: 1, opacity: 0.8 }} />
                        <Typography variant="body2" sx={{ color: '#fff', opacity: 0.95, lineHeight: 1.7 }}>
                          {text}
                        </Typography>
                      </Stack>
                    </motion.div>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default OurSpecificities;