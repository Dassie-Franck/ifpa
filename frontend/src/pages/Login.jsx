import { useState } from 'react';
import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: appel API Laravel POST /api/admin/login (ou /api/v1/candidat/login selon le profil)
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Panneau gauche - illustration */}
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          bgcolor: '#FBD5B3',
          alignItems: 'center',
          justifyContent: 'center',
          p: 6,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: 680 }}
        >
          <Box
            component="img"
            src="/assets/auth/login-illustration.svg"
            alt="Connexion à votre espace candidat"
            sx={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </motion.div>
      </Grid>

      {/* Panneau droit - formulaire */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: { xs: 3, sm: 8, md: 10 },
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RouterLink to="/">
            <Box component="img" src="/assets/logo-ifpa.png" alt="Logo IFPA" sx={{ height: 55, mb: 6 }} />
          </RouterLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
            Ravi de vous revoir ! 👋
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
            Connectez-vous à votre compte
          </Typography>
        </motion.div>

        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 440 }}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              type="email"
              placeholder="Entrez votre adresse mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Mot de passe
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
              required
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontWeight: 700, py: 1.5, mb: 2 }}
            >
              Connectez-vous
            </Button>

            <Link
              component={RouterLink}
              to="/inscription/mot-de-passe-oublie"
              sx={{ color: 'primary.main', fontWeight: 600, fontSize: '0.875rem' }}
            >
              Mot de passe oublié ?
            </Link>
          </motion.div>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;