// src/pages/Contact.jsx
import { useState } from 'react';
import { useGoogleReCaptcha } from '@google-recaptcha/react';
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

// === Composant MapIframe (réutilisable) ===
function MapIframe({ src, title = 'Carte Google Maps' }) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // ratio 16:9
        height: 0,
        overflow: 'hidden',
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          border: 0,
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </Box>
  );
}
// ======================================

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
  
  // Hook reCAPTCHA
  const { executeV3 } = useGoogleReCaptcha();

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // 1. Vérification du honeypot (délai minimum)
    if (getElapsedSeconds() < 3) {
      setError('Une erreur est survenue, veuillez réessayer.');
      return;
    }

    setSubmitting(true);

    try {
      // 2. Exécution du reCAPTCHA v3 (action: 'contact')
      const recaptchaToken = await executeV3('contact');

      // 3. Envoi du formulaire avec le token reCAPTCHA
      await contactService.submit(form, website, recaptchaToken);

      // 4. Succès
      setSuccess(true);
      setForm({ nom: '', email: '', sujet: '', message: '' });
    } catch (err) {
      // Gestion des erreurs
      if (err.response?.status === 429) {
        setError('Trop de tentatives. Veuillez patienter quelques instants.');
      } else {
        setError(
          err.response?.data?.message ||
          "Une erreur est survenue lors de l'envoi du message."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* === FORMULAIRE === */}
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

        {/* === CARTE GOOGLE MAPS === */}
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Nous trouver
          </Typography>
          <MapIframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3472.478928870512!2d9.69711649268084!3d4.053680884324629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x106113048c0b8ea1%3A0xc56e5c74dec75140!2sDB%20Digital%20Agency!5e0!3m2!1sfr!2scm!4v1785327973927!5m2!1sfr!2scm"
            title="Localisation de notre agence"
          />
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, textAlign: 'center' }}>
            DB Digital Agency – Douala, Cameroun
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
}

export default Contact;