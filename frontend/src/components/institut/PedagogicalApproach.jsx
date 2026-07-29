import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Contenu adapté du modèle de référence (§5 du cahier des charges),
// recentré sur la vision pédagogique paramédicale de l'IFPA
const activities = [
  "L'accompagnement individualisé",
  "L'engagement social",
  'Le soin porté au patient et à son environnement',
  'La promotion de la diversité',
];

function PedagogicalApproach() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="flex-start">
          {/* Colonne texte */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2 }}>
                UNE AUTRE VISION DE LA FORMATION
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
                Nos approches pédagogiques
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 3 }}>
                Dans notre vision de la formation, nous nous proposons de considérer l'apprenant
                dans toutes ses dimensions (intellectuelle, émotionnelle, relationnelle, éthique,
                humaine). Il s'agit pour nous de former des professionnels de santé compétents
                pour répondre aux besoins des structures de soins et de la société, mais de nous
                assurer aussi qu'ils soient pétris de valeurs. La pédagogie mise en œuvre dans la
                formation de nos apprenants s'enracine dans cette vision holistique de la
                personne. Le point de départ de cette pédagogie est l'expérience ou l'exercice ;
                le travail en situation qui stimule chez l'apprenant le sens du concret et de
                l'autre.
              </Typography>
              <Typography sx={{ color: 'text.secondary', lineHeight: 1.9, mb: 2 }}>
                Dans le but de développer chacune des dimensions mentionnées, un certain nombre
                d'activités sont inscrites au programme, parmi lesquelles :
              </Typography>
            </motion.div>

            <Stack spacing={1.2}>
              {activities.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.45, delay: 0.15 + index * 0.1, ease: 'easeOut' }}
                >
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <FiberManualRecordIcon sx={{ fontSize: 8, color: 'primary.main', mt: 1 }} />
                    <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>{item}</Typography>
                  </Stack>
                </motion.div>
              ))}
            </Stack>
          </Grid>

          {/* Colonne images empilées */}
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <Box
                  component="img"
                  src="/assets/banners/admission-banners.jpg"
                  alt="Atelier pratique IFPA"
                  sx={{ width: '100%', borderRadius: 1, boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              >
                <Box
                  component="img"
                  src="/assets/banners/admission-banners.jpg"
                  alt="Encadrement pédagogique IFPA"
                  sx={{ width: '100%', borderRadius: 1, boxShadow: '0 6px 20px rgba(0,0,0,0.1)' }}
                />
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PedagogicalApproach;