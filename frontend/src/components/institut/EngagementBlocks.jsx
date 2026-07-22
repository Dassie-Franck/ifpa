import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// Blocs "En proposant..." (§5 du cahier des charges) — engagements de l'IFPA
// Chaque bloc alterne : image à gauche / texte à droite, puis inversé
const engagements = [
  {
    title: 'En proposant un accompagnement individualisé',
    image: '/assets/institut/accompagnement.jpg',
    items: [
      "Un encadrement de proximité assuré par des formateurs expérimentés issus du milieu hospitalier",
      "Des plateaux techniques équipés pour simuler les réalités professionnelles dès la 1ère année",
      "Des stages pratiques progressifs au sein de structures de santé partenaires",
      "Un suivi personnalisé de la progression pédagogique de chaque étudiant",
    ],
  },
  {
    title: 'En fédérant nos partenaires autour d’un réseau de stages',
    image: '/assets/institut/reseau-stage.jpg',
    items: [
      "Un réseau d'hôpitaux et de cliniques partenaires pour l'accueil en stage",
      "Des passerelles vers l'emploi à l'issue de la formation",
      "Le partage d'expérience avec des professionnels de santé en activité",
    ],
  },
  {
    title: 'En s’engageant dans une démarche de qualité et d’éthique',
    image: '/assets/institut/ethique.jpg',
    items: [
      "Le respect strict des normes d'hygiène et de déontologie professionnelle",
      "Une pédagogie centrée sur la responsabilité et le respect du patient",
      "Un engagement continu vers l'amélioration de la qualité des enseignements",
    ],
  },
];

function EngagementBlocks() {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {engagements.map((block, index) => {
            const isReversed = index % 2 !== 0;
            return (
              <Grid item xs={12} key={block.title}>
                <Grid
                  container
                  spacing={0}
                  direction={{ xs: 'column', md: isReversed ? 'row-reverse' : 'row' }}
                >
                  <Grid item xs={12} md={5}>
                    <motion.div
                      initial={{ opacity: 0, x: isReversed ? 60 : -60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      style={{ height: '100%' }}
                    >
                      <Box
                        component="img"
                        src={block.image}
                        alt={block.title}
                        sx={{ width: '100%', height: '100%', minHeight: 260, objectFit: 'cover' }}
                      />
                    </motion.div>
                  </Grid>
                  <Grid item xs={12} md={7}>
                    <motion.div
                      initial={{ opacity: 0, x: isReversed ? -60 : 60 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                      style={{ height: '100%' }}
                    >
                      <Box sx={{ bgcolor: '#f0f0f0', height: '100%', p: 4 }}>
                        <Typography
                          variant="h6"
                          sx={{ color: 'primary.main', fontWeight: 800, mb: 2 }}
                        >
                          {block.title}
                        </Typography>
                        <Stack spacing={1.5}>
                          {block.items.map((item, i) => (
                            <Stack direction="row" spacing={1.5} key={i} alignItems="flex-start">
                              <FiberManualRecordIcon sx={{ fontSize: 8, color: 'primary.main', mt: 1 }} />
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {item}
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Box>
                    </motion.div>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default EngagementBlocks;