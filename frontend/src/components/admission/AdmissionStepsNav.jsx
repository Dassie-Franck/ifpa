import { Box, Container, Grid, Typography, Stack } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';

// Étapes du parcours admission (§6.4) — chaque étape pointe vers une ancre de la page
const steps = [
  { number: '1', label: 'Admission aux formations', anchor: '#admission' },
  { number: '2', label: 'Modalités de paiement', anchor: '#paiement' },
  { number: '3', label: 'Déroulement du processus', anchor: '#deroulement' },
  { number: '4', label: 'Questions fréquentes', anchor: '#faq' },
];

// Contact rapide par campus/antenne, avec lien WhatsApp dédié (§6.4)
// À adapter avec les vrais campus/antennes de l'IFPA
const campusContacts = [
  { label: 'Campus Principal', phone: '237600000000' },
  { label: 'Antenne 2', phone: '237600000001' },
];

function AdmissionStepsNav() {
  return (
    <Box sx={{ bgcolor: 'primary.main' }}>
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          sx={{ color: '#fff', opacity: 0.85, display: 'block', pt: 1.5, letterSpacing: 2 }}
        >
          LE CONCOURS EN QUELQUES ÉTAPES
        </Typography>
      </Container>

      <Box sx={{ bgcolor: 'primary.dark' }}>
        <Container maxWidth="lg" disableGutters>
          <Grid container>
            {steps.map((step, index) => (
              <Grid item xs={6} md={2.4} key={step.anchor}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
                >
                  <Box
                    component={HashLink}
                    smooth
                    to={step.anchor}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 2,
                      textDecoration: 'none',
                      color: '#fff',
                      borderRight: { md: '1px solid rgba(255,255,255,0.15)' },
                      height: '100%',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 300, opacity: 0.7 }}>
                      {step.number}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                      {step.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}

            {/* Boutons WhatsApp par campus */}
            {campusContacts.map((contact, index) => (
              <Grid item xs={6} md={1.2} key={contact.phone}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.12, ease: 'easeOut' }}
                  style={{ height: '100%' }}
                >
                 
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default AdmissionStepsNav;