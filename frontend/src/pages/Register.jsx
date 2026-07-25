import { useState } from 'react';
import { Box, Typography, TextField, Button, Link, Alert, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCandidatAuth } from '../context/CandidatAuthContext';
import { candidatureService } from '../services/candidatureService';

function Register() {
  const navigate = useNavigate();
  const { register } = useCandidatAuth();

  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    passwordConfirmation: '',
    referenceCandidature: '' 
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form.name, form.email, form.password, form.passwordConfirmation);

      if (form.referenceCandidature.trim()) {
        try {
          await candidatureService.lierCandidature(form.referenceCandidature.trim().toUpperCase());
        } catch (linkError) {
          console.log('Liaison automatique échouée, le candidat pourra réessayer depuis son dashboard');
        }
      }

      navigate('/inscription/tableau-de-bord');
    } catch (err) {
      const messages = err.response?.data?.errors;
      const firstMessage = messages ? Object.values(messages)[0][0] : null;
      setError(firstMessage || 'Impossible de créer le compte. Veuillez réessayer.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999
    }}>
      {/* Colonne gauche - SVG avec fond transparent */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          width: '50%',
          bgcolor: '#FBD5B3',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -100,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.08)',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ 
            width: '100%', 
            maxWidth: 750,
            position: 'relative',
            zIndex: 1
          }}
        >
          <Box
            component="img"
            src="/assets/login/signin.svg"
            alt="Créer votre compte candidat"
            sx={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block',
              maxHeight: '70vh',
              objectFit: 'contain'
            }}
          />
        </motion.div>
      </Box>

      {/* Colonne droite - Formulaire d'inscription */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: { xs: 3, sm: 6, md: 8, lg: 10 },
          py: { xs: 4, sm: 6 },
          bgcolor: 'background.paper',
          overflowY: 'auto'
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 440 }}>
          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ 
              mb: { xs: 4, sm: 5, md: 6 }, 
              display: 'flex', 
              justifyContent: 'center',
              width: '100%'
            }}>
              <RouterLink to="/" style={{ display: 'block' }}>
                <Box 
                  component="img" 
                  src="/assets/new_logo.jpeg" 
                  alt="Logo IFPA" 
                  sx={{ 
                    height: { xs: 80, sm: 100, md: 120 }, 
                    display: 'block',
                    mx: 'auto'
                  }} 
                />
              </RouterLink>
            </Box>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5, fontSize: '0.875rem', textAlign: 'center' }}>
              Bienvenue !
            </Typography>
            <Typography variant="h4" sx={{ 
              fontWeight: 800, 
              mb: { xs: 3, sm: 4 },
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
              textAlign: 'center'
            }}>
              Créez votre espace candidat
            </Typography>
          </motion.div>

          <Box component="form" onSubmit={handleSubmit}>
            {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>Nom complet</Typography>
              <TextField 
                fullWidth 
                placeholder="Votre nom complet" 
                value={form.name} 
                onChange={update('name')} 
                sx={{ mb: 3 }} 
                required 
                size="medium"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>Email</Typography>
              <TextField 
                fullWidth 
                type="email" 
                placeholder="Entrez votre adresse mail" 
                value={form.email} 
                onChange={update('email')} 
                sx={{ mb: 3 }} 
                required 
                size="medium"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>Mot de passe</Typography>
              <TextField 
                fullWidth 
                type="password" 
                placeholder="8 caractères minimum" 
                value={form.password} 
                onChange={update('password')} 
                sx={{ mb: 3 }} 
                required 
                size="medium"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>Confirmer le mot de passe</Typography>
              <TextField 
                fullWidth 
                type="password" 
                placeholder="Retapez votre mot de passe" 
                value={form.passwordConfirmation} 
                onChange={update('passwordConfirmation')} 
                sx={{ mb: 3 }} 
                required 
                size="medium"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                Référence de candidature (optionnel)
              </Typography>
              <TextField
                fullWidth
                placeholder="Si vous avez déjà déposé un dossier, ex: IFPA-XXXXXXXX"
                value={form.referenceCandidature}
                onChange={update('referenceCandidature')}
                sx={{ mb: 3 }}
                size="medium"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                color="primary" 
                size="large" 
                disabled={submitting} 
                sx={{ 
                  fontWeight: 700, 
                  py: 1.5, 
                  mb: 3,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1rem',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                {submitting ? 'Création...' : 'Créer mon compte'}
              </Button>

              <Stack direction="row" justifyContent="center">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Déjà un compte ?{' '}
                  <Link 
                    component={RouterLink} 
                    to="/inscription/connexion" 
                    sx={{ 
                      color: 'primary.main', 
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    Connectez-vous
                  </Link>
                </Typography>
              </Stack>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Register;