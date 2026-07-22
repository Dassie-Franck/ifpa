import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import { motion } from 'framer-motion';

// Présentation générale de l'IFPA (§5 du cahier des charges : historique, mission, vision)
// Textes provisoires — à valider/enrichir par la direction de l'IFPA avant intégration finale
const paragraphs = [
  "L'Institut de Formation Professionnelle Antonny (IFPA) est un établissement de formation spécialisé dans le domaine paramédical. Sa mission principale est de former des hommes et des femmes techniquement compétents et humainement responsables aux métiers de la santé (soins infirmiers, aide-soignant, sage-femme, technicien de laboratoire, et autres filières paramédicales).",
  "L'IFPA a pour objectif principal de répondre au mieux aux besoins des structures de santé de la sous-région, en formant des professionnels opérationnels dès la sortie de formation, et en proposant des parcours initiaux ainsi que des formations continues. Les candidats sont sélectionnés à l'issue d'un processus d'admission organisé en plusieurs étapes : dépôt de dossier en ligne et entretien de sélection.",
  "L'institut associe l'acquisition des connaissances théoriques à leur mise en pratique sur le terrain, à travers un réseau de structures de stage partenaires (hôpitaux, cliniques) et des plateaux techniques équipés, permettant à chaque étudiant de développer à la fois savoir-faire et savoir-être.",
];

function AboutIntro() {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h4" textAlign="center" sx={{ fontWeight: 800, mb: 6 }}>
            Institut <Box component="span" sx={{ color: 'primary.main' }}>IFPA</Box>
          </Typography>
        </motion.div>

        <Grid container spacing={5} alignItems="flex-start">
          {/* Colonne gauche : 2 images empilées en décalage */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative', height: { xs: 380, md: 460 } }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ position: 'absolute', top: 0, left: 0, width: '75%', zIndex: 1 }}
              >
                <Box
                  component="img"
                  src="/assets/filieres/assistant-cabinet.jpg"
                  alt="Vie pédagogique IFPA"
                  sx={{ width: '100%', borderRadius: 1, boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                style={{ position: 'absolute', bottom: 0, right: 0, width: '75%', zIndex: 2 }}
              >
                <Box
                  component="img"
                  src="/assets/filieres/assistant-cabinet.jpg"
                  alt="Encadrement pédagogique IFPA"
                  sx={{ width: '100%', borderRadius: 1, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}
                />
              </motion.div>
            </Box>
          </Grid>

          {/* Colonne droite : texte */}
          <Grid item xs={12} md={7}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2 }}>
                À PROPOS
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
                Qui sommes-nous ?
              </Typography>
            </motion.div>

            <Stack spacing={2.5}>
              {paragraphs.map((text, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
                >
                  <Typography sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
                    {text}
                  </Typography>
                </motion.div>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AboutIntro;