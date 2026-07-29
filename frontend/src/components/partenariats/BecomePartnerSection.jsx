import { Box, Container, Grid, Typography, Stack, Button } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { motion } from 'framer-motion';

// Adapté du modèle "Devenir partenaire" (référence UCAC-ICAM), recentré
// sur le contexte paramédical de l'IFPA — texte à valider avec la direction
const engagements = [
  "Le rapprochement entre la formation paramédicale et les structures de santé de la sous-région",
  "La facilitation de l'insertion professionnelle des jeunes diplômés issus de nos formations",
  "Un sourcing facilité pour les structures de santé partenaires (stages, recrutements)",
  "La prise en compte des besoins réels du terrain dans notre référentiel pédagogique",
];

function BecomePartnerSection() {
  return (
    <Box sx={{ py: 8, bgcolor: '#fafafa' }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2 }}>
                REJOIGNEZ-NOUS
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
                Devenir partenaire
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
                L'IFPA déclare sa volonté de conclure des partenariats avec les structures de
                santé de la région, pour renforcer les collaborations existantes autour d'une
                vision commune : rapprocher la formation paramédicale des réalités du terrain.
              </Typography>

              <Stack spacing={1.5}>
                {engagements.map((item) => (
                  <Stack direction="row" spacing={1.5} alignItems="flex-start" key={item}>
                    <FiberManualRecordIcon sx={{ fontSize: 8, color: 'primary.main', mt: 1 }} />
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>{item}</Typography>
                  </Stack>
                ))}
              </Stack>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 4, fontWeight: 700 }}
                href="/contact"
              >
                Nous contacter
              </Button>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Box
                component="img"
                src="/assets/partenariats/devenir-partenaire.jpg"
                alt="Devenir partenaire de l'IFPA"
                sx={{ width: '100%', borderRadius: 1, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
              />
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default BecomePartnerSection;