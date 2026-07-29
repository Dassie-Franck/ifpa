import { Box, Container, Grid, Typography, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import AccordionList from '../common/AccordionList';

// Étapes du processus d'inscription en ligne (§6.5 du cahier des charges)
const steps = [
  {
    title: 'ÉTAPE 01',
    content:
      "Je paie les frais de dossier correspondant à la filière choisie via Mobile Money (Orange Money, MTN Mobile Money)",
  },
  {
    title: 'ÉTAPE 02',
    content:
      "Je reçois par SMS et par email un identifiant unique de paiement, à reporter dans le formulaire d'inscription.",
  },
  {
    title: 'ÉTAPE 03',
    content:
      "J'uploade une photo d'identité numérique et mes pièces justificatives (diplômes, actes, certificat médical).",
  },
  {
    title: 'ÉTAPE 04',
    content:
      "Je complète le formulaire d'inscription en ligne multi-étapes (identité, filière choisie, coordonnées, niveau d'études).",
  },
];

function AdmissionIntro() {
  return (
    <Box id="admission" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <SectionTitle label="À PROPOS DES INSCRIPTIONS " title="Admissions aux formations" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography textAlign="center" sx={{ color: 'text.secondary', maxWidth: 800, mx: 'auto', mb: 5 }}>
           L'Institut de Formation Professionnelle ATONNY (IFPA) forme des candidats aux métiers du paramédical et de la santé : Délégué Médical, Vendeur en Pharmacie, Auxiliaire de Vie, Assistant en Cabinet Médical et Aide Chimiste Biologiste. Une formation professionnalisante en 1 an (dont 3 mois de stage) qui prépare des hommes et des femmes techniquement compétents et humainement responsables, prêts à s'insérer dans le secteur paramédical. Nos formations sont sanctionnées par un DQP (Diplôme de Qualification Professionnelle) ou un CQP (Certificat de Qualification Professionnelle) reconnus à l'échelle nationale et internationale.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <AccordionList items={steps} defaultOpenIndex={0} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                component={RouterLink}
                to="/inscription/selection"
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{ mt: 3, fontWeight: 700 }}
              >
                Je m'inscris
              </Button>
            </motion.div>
          </Grid>

          {/* Plaquette téléchargeable */}
          <Grid item xs={12} md={5}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <Box
                component="img"
                src="/assets/evenements/evenement1.png"
                alt="Plaquette IFPA"
                sx={{ width: '20%', borderRadius: 1, boxShadow: '0 4px 16px rgba(0,0,0,0.15)', mb: 2 }}
              />
              <Grid item xs={12} md={7}>
           
 
            
              <Button
                component={RouterLink}
                
                variant="contained"
               
                href="/assets/admission/plaquette-ifpa.pdf"
                sx={{ fontWeight: 700 }}
              >
               Telecharger
              </Button>
            
          </Grid>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AdmissionIntro;