import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Container,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import HoneypotField from '../components/common/HoneypotField';
import useFormTiming from '../hooks/useFormTiming';
import { contactService } from '../services/contactService';
// Si vous avez des composants Navbar et Footer, décommentez :
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

function Contact() {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    sujet: '',
    message: '',
  });
  const [website, setWebsite] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { getElapsedSeconds } = useFormTiming();

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Vérification du délai minimum (anti-bot)
    if (getElapsedSeconds() < 3) {
      setError('Une erreur est survenue, veuillez réessayer.');
      return;
    }

    setSubmitting(true);
    try {
      await contactService.submit(form, website);
      setSuccess(true);
      setForm({ nom: '', email: '', sujet: '', message: '' });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Si vous avez un Navbar, décommentez : <Navbar /> */}
      <Container maxWidth="md" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={3} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 4 }}>
            <Typography variant="h4" align="center" sx={{ fontWeight: 700, mb: 1 }}>
              Contactez-nous
            </Typography>
            <Typography variant="body1" align="center" sx={{ color: 'text.secondary', mb: 4 }}>
              Une question ? Un projet ? Écrivez-nous, nous vous répondrons dans les plus brefs délais.
            </Typography>

            <Box component="form" onSubmit={handleSubmit}>
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}
              {success && (
                <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
                  Votre message a été envoyé avec succès ! Nous reviendrons vers vous rapidement.
                </Alert>
              )}

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nom complet"
                    placeholder="Votre nom"
                    value={form.nom}
                    onChange={update('nom')}
                    required
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Adresse email"
                    type="email"
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={update('email')}
                    required
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Sujet"
                    placeholder="Objet de votre message"
                    value={form.sujet}
                    onChange={update('sujet')}
                    required
                    size="medium"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={5}
                    placeholder="Écrivez votre message ici..."
                    value={form.message}
                    onChange={update('message')}
                    required
                    size="medium"
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                disabled={submitting}
                sx={{
                  mt: 4,
                  fontWeight: 700,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                {submitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </Button>

              {/* Honeypot invisible */}
              <HoneypotField value={website} onChange={(e) => setWebsite(e.target.value)} />
            </Box>
          </Paper>
        </motion.div>
      </Container>
      {/* Si vous avez un Footer, décommentez : <Footer /> */}
    </>
  );
}

export default Contact;