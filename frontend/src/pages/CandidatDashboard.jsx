import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Stack, 
  Button, 
  CircularProgress, 
  Alert, 
  Snackbar,
  useTheme,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { candidatureService } from '../services/candidatureService';
import { useCandidatAuth } from '../context/CandidatAuthContext';
import CandidatureCard from '../components/inscription/dashboard/CandidatureCard';
import LinkCandidatureForm from '../components/inscription/dashboard/LinkCandidatureForm';
import usePolling from '../hooks/usePolling';
import { playNotificationSound } from '../utils/notificationSound';

function CandidatDashboard() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const { user, logout } = useCandidatAuth();
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [changeAlert, setChangeAlert] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const previousStatutsRef = useRef({});
  const isFirstLoadRef = useRef(true);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const fetchCandidatures = useCallback(async (isBackground = false) => {
    if (!isBackground) setLoading(true);
    try {
      const data = await candidatureService.getMesCandidatures();

      if (!isFirstLoadRef.current) {
        data.forEach((c) => {
          const previousStatut = previousStatutsRef.current[c.id];
          if (previousStatut && previousStatut !== c.statut) {
            playNotificationSound();
            setChangeAlert(`Mise à jour : votre dossier "${c.filiere}" est maintenant "${c.statut}".`);
          }
        });
      }

      previousStatutsRef.current = Object.fromEntries(data.map((c) => [c.id, c.statut]));
      isFirstLoadRef.current = false;

      setCandidatures(data);
      setError('');
    } catch (err) {
      if (!isBackground) setError('Impossible de charger vos candidatures.');
    } finally {
      if (!isBackground) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCandidatures(false);
  }, [fetchCandidatures]);

  usePolling(() => fetchCandidatures(true), 15000, true);

  const totalCandidatures = candidatures.length;

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      pt: { xs: 2, sm: 3, md: 4 },
      pb: { xs: 4, sm: 5, md: 6 }
    }}>
      <Container maxWidth="md" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              mb: { xs: 2, sm: 3, md: 4 },
              borderRadius: { xs: 2, sm: 2.5 },
              bgcolor: 'primary.main',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                justifyContent="space-between" 
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={{ xs: 2, sm: 1.5 }}
              >
                <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
                  <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 500, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                    Tableau de bord
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700, 
                      letterSpacing: '-0.5px',
                      fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.5rem' }
                    }}
                  >
                    Bonjour {user?.name?.split(' ')[0] || 'Candidat'}
                  </Typography>
                </Box>

                {!isMobile && (
                  <Stack direction="row" spacing={1.5} sx={{ flexShrink: 0 }}>
                    <Button
                      component={RouterLink}
                      to="/inscription/selection"
                      variant="contained"
                      startIcon={<AddIcon />}
                      size={isTablet ? 'small' : 'medium'}
                      sx={{
                        fontWeight: 700,
                        bgcolor: 'white',
                        color: 'primary.main',
                        px: { sm: 2, md: 3 },
                        py: { sm: 0.8, md: 1 },
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: { sm: '0.8rem', md: '0.875rem' },
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        '&:hover': {
                          bgcolor: 'grey.50',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Nouveau dossier
                    </Button>
                    <Button
                      onClick={logout}
                      variant="outlined"
                      startIcon={<LogoutIcon />}
                      size={isTablet ? 'small' : 'medium'}
                      sx={{
                        fontWeight: 600,
                        borderColor: 'rgba(255,255,255,0.4)',
                        color: 'white',
                        px: { sm: 2, md: 3 },
                        py: { sm: 0.8, md: 1 },
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: { sm: '0.8rem', md: '0.875rem' },
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255,255,255,0.15)'
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Déconnexion
                    </Button>
                  </Stack>
                )}

                {isMobile && (
                  <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                    <Button
                      component={RouterLink}
                      to="/inscription/selection"
                      variant="contained"
                      startIcon={<AddIcon />}
                      fullWidth
                      sx={{
                        fontWeight: 700,
                        bgcolor: 'white',
                        color: 'primary.main',
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontSize: '0.8rem',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        '&:hover': {
                          bgcolor: 'grey.50'
                        },
                        flex: 1
                      }}
                    >
                      Nouveau dossier
                    </Button>
                    <IconButton
                      onClick={handleMenuOpen}
                      sx={{
                        color: 'white',
                        bgcolor: 'rgba(255,255,255,0.15)',
                        borderRadius: 2,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.25)'
                        },
                        width: 48,
                        height: 48
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleMenuClose}
                      PaperProps={{
                        sx: {
                          mt: 1,
                          borderRadius: 2,
                          minWidth: 180,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                        }
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem onClick={handleLogout} sx={{ py: 1.5, gap: 1.5 }}>
                        <LogoutIcon fontSize="small" color="error" />
                        <Typography fontWeight={500}>Déconnexion</Typography>
                      </MenuItem>
                    </Menu>
                  </Stack>
                )}
              </Stack>
            </Box>

            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: { xs: 150, sm: 200 },
                height: { xs: 150, sm: 200 },
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.05)',
                zIndex: 0
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -80,
                left: -80,
                width: { xs: 200, sm: 250 },
                height: { xs: 200, sm: 250 },
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.05)',
                zIndex: 0
              }}
            />
          </Paper>

          {!loading && !error && candidatures.length > 0 && (
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={{ xs: 1.5, sm: 2 }} 
              sx={{ mb: { xs: 2, sm: 3 } }}
            >
              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: { xs: 2, sm: 2.5 },
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 1.5, sm: 2 }
                }}
              >
                <Box sx={{ 
                  p: { xs: 1, sm: 1.5 }, 
                  borderRadius: 2, 
                  bgcolor: 'primary.light',
                  color: 'primary.main',
                  display: 'flex'
                }}>
                  <AssignmentIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      lineHeight: 1.2,
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                    }}
                  >
                    {totalCandidatures}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary', 
                      fontWeight: 500,
                      fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' }
                    }}
                  >
                    Total dossiers
                  </Typography>
                </Box>
              </Paper>

              <Paper
                elevation={0}
                sx={{
                  flex: 1,
                  p: { xs: 2, sm: 2.5 },
                  borderRadius: { xs: 2, sm: 2.5 },
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 1.5, sm: 2 }
                }}
              >
                <Box sx={{ 
                  p: { xs: 1, sm: 1.5 }, 
                  borderRadius: 2, 
                  bgcolor: 'warning.light',
                  color: 'warning.main',
                  display: 'flex'
                }}>
                  <DashboardIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 700, 
                      lineHeight: 1.2,
                      fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' }
                    }}
                  >
                    {candidatures.filter(c => c.statut === 'en_attente').length}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary', 
                      fontWeight: 500,
                      fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.875rem' }
                    }}
                  >
                    En attente
                  </Typography>
                </Box>
              </Paper>
            </Stack>
          )}

          <Box sx={{ mb: { xs: 3, sm: 4 } }}>
            <LinkCandidatureForm onSuccess={() => fetchCandidatures(false)} />
          </Box>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 2.5, md: 3 },
              borderRadius: { xs: 2, sm: 2.5 },
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper'
            }}
          >
            <Stack 
              direction="row" 
              justifyContent="space-between" 
              alignItems="center" 
              sx={{ mb: { xs: 2, sm: 2.5 } }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
                }}
              >
                Mes candidatures
              </Typography>
            </Stack>

            <Divider sx={{ mb: { xs: 2, sm: 2.5 } }} />

            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: { xs: 6, sm: 8 } }}>
                <CircularProgress size={isMobile ? 32 : 40} color="primary" />
              </Box>
            )}

            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            {!loading && !error && candidatures.length === 0 && (
              <Box sx={{ textAlign: 'center', py: { xs: 6, sm: 8 } }}>
                <AssignmentIcon sx={{ fontSize: { xs: 48, sm: 56 }, color: 'text.disabled', mb: 2 }} />
                <Typography 
                  sx={{ 
                    color: 'text.secondary', 
                    mb: 2,
                    fontSize: { xs: '0.9rem', sm: '1rem' }
                  }}
                >
                  Vous n'avez encore déposé aucun dossier de candidature.
                </Typography>
                <Button 
                  component={RouterLink} 
                  to="/inscription/selection" 
                  variant="contained" 
                  sx={{ 
                    fontWeight: 700,
                    px: { xs: 3, sm: 4 },
                    py: { xs: 1, sm: 1.2 },
                    borderRadius: 2,
                    textTransform: 'none',
                    fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                  }}
                >
                  Déposer mon premier dossier
                </Button>
              </Box>
            )}

            {!loading && !error && candidatures.length > 0 && (
              <Stack spacing={{ xs: 1.5, sm: 2 }}>
                {candidatures.map((candidature, index) => (
                  <CandidatureCard
                    key={candidature.id}
                    candidature={candidature}
                    delay={index * 0.08}
                    onRefresh={() => fetchCandidatures(false)}
                  />
                ))}
              </Stack>
            )}
          </Paper>
        </motion.div>

        <Snackbar
          open={!!changeAlert}
          autoHideDuration={6000}
          onClose={() => setChangeAlert('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{ bottom: { xs: 16, sm: 24 } }}
        >
          <Alert 
            severity="info" 
            onClose={() => setChangeAlert('')} 
            sx={{ 
              fontWeight: 600,
              borderRadius: 2,
              fontSize: { xs: '0.8rem', sm: '0.875rem' }
            }}
          >
            {changeAlert}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default CandidatDashboard;