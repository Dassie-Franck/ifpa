import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';

function AdmissionProcess() {
  return (
    <Box id="deroulement" sx={{ py: 8 }}>
      <Container maxWidth="md">
        <SectionTitle label="À PROPOS DU CONCOURS" title="Déroulement du processus" />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Typography sx={{ color: 'text.secondary', mb: 3, lineHeight: 1.9 }}>
            L'admission se déroule en 2 phases : une phase de dépôt de dossier en ligne, puis
            un entretien de sélection pour les candidats déclarés admissibles. Le dépôt de dossier
            se fait entièrement sur la plateforme en ligne de l'IFPA. Les pièces justificatives
            complémentaires ne sont exigées qu'à l'admission définitive.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <Typography sx={{ color: 'text.secondary', lineHeight: 1.9 }}>
            Les candidats sont priés de se munir des éléments suivants pour le dépôt de dossier :{' '}
            <Box component="strong" sx={{ color: 'text.primary' }}>
              Smartphone ou ordinateur avec connexion internet
            </Box>{' '}
            – Photo d'identité numérique récente – Copie des diplômes et actes –{' '}
            <Box component="strong" sx={{ color: 'text.primary' }}>
              Certificat médical
            </Box>{' '}
            – Pièce d'identité (nationale ou scolaire).
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}

export default AdmissionProcess;