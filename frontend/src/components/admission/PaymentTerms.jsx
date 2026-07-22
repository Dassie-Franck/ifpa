import { Box, Container, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import AccordionList from '../common/AccordionList';

// Modalités de paiement des frais de dossier (§6.4, §8.1 du cahier des charges)
// Montants et moyens à ajuster selon les tarifs réels définis par l'IFPA
const paymentItems = [
  {
    title: 'FRAIS DE DOSSIER',
    content:
      "10 000 FCFA pour le choix initial de filière. 5 000 FCFA par choix de filière supplémentaire.",
  },
  {
    title: 'PAIEMENT PAR MOBILE MONEY',
    content:
      "Orange Money et MTN Mobile Money. Un code de paiement s'affiche à l'écran ; suivez les instructions reçues par SMS pour valider la transaction.",
  },
  {
    title: 'PAIEMENT PAR CARTE BANCAIRE',
    content:
      "Paiement sécurisé par carte Visa ou Mastercard directement depuis le formulaire d'inscription en ligne.",
  },
  {
    title: 'PAIEMENT PAR PAYPAL',
    content:
      "Pour les candidats résidant à l'étranger, le paiement via PayPal est également accepté.",
  },
  {
    title: 'EN CAS DE DIFFICULTÉ DE PAIEMENT',
    content:
      "Contactez directement l'équipe des admissions via le bouton WhatsApp du campus concerné, en haut de cette page.",
  },
];

function PaymentTerms() {
  return (
    <Box id="paiement" sx={{ py: 8, bgcolor: '#fafafa' }}>
      <Container maxWidth="md">
        <SectionTitle label="À PROPOS DU CONCOURS" title="Modalités de paiement" />

        <AccordionList items={paymentItems} defaultOpenIndex={0} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Box textAlign="center">
            <Button
              component={RouterLink}
              to="/admission/inscription"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{ mt: 4, fontWeight: 700 }}
            >
              Je m'inscris
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default PaymentTerms;