import { useState } from 'react';
import { Box, Container, Grid, Typography, Radio, FormControlLabel, Button, Stack, useTheme, useMediaQuery } from '@mui/material';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Pays et centres de dépôt de dossier (§6.4) — à ajuster avec les vraies zones IFPA
const countries = [
  {
    code: 'CM',
    flag: '🇨🇲',
    name: 'Cameroun',
    centers: ['Douala', 'Yaoundé', 'Garoua', 'Ngaoundéré', 'Maroua', 'Bafoussam', 'Bertoua'],
  },
  {
    code: 'CG',
    flag: '🇨🇬',
    name: 'République du Congo',
    centers: ['Pointe-Noire', 'Brazzaville'],
  },
  {
    code: 'GA',
    flag: '🇬🇦',
    name: 'Gabon',
    centers: ['Libreville', 'Port-Gentil'],
  },
  {
    code: 'CI',
    flag: '🇨🇮',
    name: "Côte d'Ivoire",
    centers: ['Abidjan', 'Bouaké'],
  },
  {
    code: 'SN',
    flag: '🇸🇳',
    name: 'Sénégal',
    centers: ['Dakar', 'Thiès'],
  },
];

function CountryCenterSelector() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [selectedCountry, setSelectedCountry] = useState(countries[0].code);
  const [selectedCenter, setSelectedCenter] = useState('');

  const activeCountry = countries.find((c) => c.code === selectedCountry);

  const handleContinue = () => {
    if (!selectedCenter) return;
    navigate(`/inscription/formulaire?centre=${encodeURIComponent(selectedCenter)}`);
  };

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* Bandeau session / dates limites */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ bgcolor: '#f0f0f0', py: { xs: 1.5, sm: 2 } }}>
          <Container maxWidth="lg">
            <Stack
              direction={{ xs: 'column', sm: 'column', md: 'row' }}
              justifyContent="space-between"
              spacing={{ xs: 1, sm: 1.5 }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Session de : Août 2026
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 0.5, sm: 2 },
                flexWrap: 'wrap'
              }}>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Date limite des dépôts en ligne :{' '}
                  <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    vendredi 31 juillet 2026
                  </Box>
                </Typography>
                <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                  Traitement des dossiers dès :{' '}
                  <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>
                    mercredi 5 août 2026
                  </Box>
                </Typography>
              </Box>
            </Stack>
          </Container>
        </Box>
      </motion.div>

      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Typography variant="h6" sx={{ 
            fontWeight: 700, 
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: '1.1rem', sm: '1.25rem' }
          }}>
            Choisissez votre pays
          </Typography>
        </motion.div>

        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {/* Colonne pays - sur mobile passe en haut */}
          <Grid item xs={12} md={5} order={{ xs: 1, md: 1 }}>
            <Stack spacing={{ xs: 1, sm: 1.5 }}>
              {countries.map((country, index) => {
                const isActive = selectedCountry === country.code;
                return (
                  <motion.div
                    key={country.code}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
                  >
                    <Box
                      onClick={() => {
                        setSelectedCountry(country.code);
                        setSelectedCenter('');
                      }}
                      sx={{
                        bgcolor: isActive ? 'primary.main' : '#fff',
                        color: isActive ? '#fff' : 'text.primary',
                        border: '1px solid',
                        borderColor: isActive ? 'primary.main' : '#eee',
                        px: { xs: 1.5, sm: 2, md: 2.5 },
                        py: { xs: 1.2, sm: 1.5, md: 1.8 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        borderRadius: { xs: 0, sm: 0 },
                        '&:hover': {
                          bgcolor: isActive ? 'primary.dark' : '#f5f5f5',
                        },
                      }}
                    >
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Typography sx={{ fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.3rem' } }}>
                          {country.flag}
                        </Typography>
                        <Typography sx={{ 
                          fontWeight: 700,
                          fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
                        }}>
                          {country.name}
                        </Typography>
                      </Stack>
                      {isActive ? (
                        <KeyboardArrowRightIcon sx={{ 
                          color: 'secondary.main',
                          fontSize: { xs: '1.2rem', sm: '1.5rem' }
                        }} />
                      ) : (
                        <KeyboardArrowDownIcon sx={{ 
                          color: 'secondary.main',
                          fontSize: { xs: '1.2rem', sm: '1.5rem' }
                        }} />
                      )}
                    </Box>
                  </motion.div>
                );
              })}
            </Stack>
          </Grid>

          {/* Colonne centres - sur mobile passe en dessous */}
          <Grid item xs={12} md={7} order={{ xs: 2, md: 2 }}>
            <Box sx={{ 
              bgcolor: '#f0f0f0', 
              px: { xs: 1.5, sm: 2, md: 2.5 }, 
              py: { xs: 1, sm: 1.2, md: 1.5 }, 
              mb: { xs: 1.5, sm: 2 },
              borderRadius: { xs: 0, sm: 0 }
            }}>
              <Typography sx={{ 
                fontWeight: 700,
                fontSize: { xs: '0.85rem', sm: '0.9rem', md: '1rem' }
              }}>
                Choisissez votre centre de dépôt
              </Typography>
            </Box>

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCountry}
                initial={{ opacity: 0, x: isMobile ? 0 : 30, y: isMobile ? 20 : 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: isMobile ? 0 : -30, y: isMobile ? -20 : 0 }}
                transition={{ duration: 0.35 }}
              >
                <Grid container spacing={{ xs: 0.5, sm: 1, md: 1.5 }} sx={{ px: { xs: 0.5, sm: 1 } }}>
                  {activeCountry.centers.map((center) => (
                    <Grid item xs={6} sm={4} md={4} key={center}>
                      <FormControlLabel
                        control={
                          <Radio
                            checked={selectedCenter === center}
                            onChange={() => setSelectedCenter(center)}
                            color="secondary"
                            size={isMobile ? "small" : "medium"}
                          />
                        }
                        label={center}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: { xs: '0.8rem', sm: '0.875rem', md: '0.9rem' },
                          },
                          marginRight: { xs: 0, sm: 1 },
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Box sx={{ 
                textAlign: { xs: 'center', sm: 'right', md: 'right' }, 
                mt: { xs: 3, sm: 4 },
                px: { xs: 1, sm: 0 }
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!selectedCenter}
                  onClick={handleContinue}
                  fullWidth={isMobile}
                  sx={{
                    fontWeight: 700,
                    opacity: selectedCenter ? 1 : 0.6,
                    py: { xs: 1.2, sm: 1 },
                    px: { xs: 2, sm: 4 },
                    fontSize: { xs: '0.9rem', sm: '0.875rem' },
                    '&:hover': {
                      bgcolor: selectedCenter ? 'primary.dark' : undefined,
                    },
                  }}
                >
                  Continuer
                </Button>
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        {/* Instructions supplémentaires pour mobile */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <Box sx={{ 
              mt: 3, 
              p: 2, 
              bgcolor: '#f9f9f9', 
              borderRadius: 1,
              border: '1px solid #eee'
            }}>
              <Typography variant="caption" color="textSecondary" sx={{ display: 'block', textAlign: 'center' }}>
                💡 Sélectionnez d'abord votre pays, puis choisissez votre centre de dépôt
              </Typography>
            </Box>
          </motion.div>
        )}
      </Container>
    </Box>
  );
}

export default CountryCenterSelector;