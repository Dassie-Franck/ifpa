import { Box, Container, Grid, Typography, Stack, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link as RouterLink } from 'react-router-dom';

// 4 points forts (§6.1) - icônes et textes alignés sur la maquette
const features = [
  {
    icon: SchoolIcon,
    text: "Des formations pluridisciplinaires où l'étudiant allie théorie et pratique, mais aussi savoir-faire et savoir-être",
  },
  {
    icon: HubIcon,
    text: 'Des laboratoires et ateliers équipés à la pointe de la technologie, pour simuler les réalités industrielles',
  },
  {
    icon: DirectionsBikeIcon,
    text: "Des clubs associatifs et des espaces détentes diversifiés pour l'épanouissement des étudiants",
  },
  {
    icon: StorefrontIcon,
    text: "Des résidences sécurisées et équipées, ainsi qu'une aumônerie avec la présence des prêtres jésuites",
  },
];

// Campus / antennes de formation - à remplacer par les vraies données IFPA
const campuses = [
  {
    name: 'Campus Principal',
    description: "Situé au cœur de la ville, dans un cadre propice à l'apprentissage et à la pratique clinique",
    image: '/assets/campus/campus1.jpg',
    link: '/vie-au-campus/presentation',
    color: 'primary.main',
  },
  {
    name: 'Antenne 2',
    description: 'Situé dans un environnement moderne et accessible aux structures de stage partenaires',
    image: '/assets/campus/campus2.jpg',
    link: '/vie-au-campus/presentation',
    color: 'primary.dark',
  },
];

// Laboratoire médical / Infrastructures - deux blocs alignés sur la même ligne
// (à remplacer par vos vraies images de laboratoire et d'infrastructure)
const facilities = [
  {
    name: 'Laboratoire Médical',
    description: 'Des plateaux techniques équipés pour la simulation des pratiques cliniques et paramédicales',
    image: '/assets/campus/campus1.jpg',
    link: '/vie-au-campus/laboratoire',
    color: 'primary.main',
  },
  {
    name: 'Infrastructures',
    description: 'Des infrastructures modernes et sécurisées au service de la réussite des étudiants',
    image: '/assets/campus/campus1.jpg',
    link: '/vie-au-campus/infrastructures',
    color: 'primary.dark',
  },
];

function OurCampuses() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'flex-start',
            gap: 5,
          }}
        >
          {/* Colonne gauche : titre + 4 points */}
          <Box sx={{ width: { xs: '100%', md: '41.6667%' }, flexShrink: 0 }}>
            <Typography
              variant="overline"
              display="block"
              sx={{ color: 'text.secondary', letterSpacing: 2, mb: 1 }}
            >
              NOS CAMPUS
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: 'warning.main', mb: 3, lineHeight: 1.3 }}
            >
              Des espaces propices à l'apprentissage et à l'épanouissement
            </Typography>

            <Stack spacing={3}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Stack direction="row" spacing={2} alignItems="flex-start" key={index}>
                    <Box
                      sx={{
                        bgcolor: '#7a1f1f',
                        color: '#fff',
                        borderRadius: '50%',
                        width: 44,
                        height: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 22 }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.primary', pt: 0.7 }}>
                      {feature.text}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>

          {/* Colonne droite : mosaïque 2x2 en diagonale (texte/image/image/texte) */}
          <Box sx={{ width: { xs: '100%', md: '58.3333%' }, flexShrink: 0 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '300px 300px',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              {/* Cellule 1 : texte du campus 0 (haut-gauche) */}
              <Box
                sx={{
                  bgcolor: campuses[0].color,
                  color: '#fff',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  {campuses[0].name.toUpperCase()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  {campuses[0].description}
                </Typography>
                <Button
                  component={RouterLink}
                  to={campuses[0].link}
                  size="small"
                  variant="outlined"
                  sx={{ color: '#fff', borderColor: '#fff', alignSelf: 'flex-start' }}
                >
                  En savoir +
                </Button>
              </Box>

              {/* Cellule 2 : image du campus 0 (haut-droite) */}
              <Box
                sx={{
                  backgroundImage: `url(${campuses[0].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Cellule 3 : image du campus 1 (bas-gauche) */}
              <Box
                sx={{
                  backgroundImage: `url(${campuses[1].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Cellule 4 : texte du campus 1 (bas-droite) */}
              <Box
                sx={{
                  bgcolor: campuses[1].color,
                  color: '#fff',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                  {campuses[1].name.toUpperCase()}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                  {campuses[1].description}
                </Typography>
                <Button
                  component={RouterLink}
                  to={campuses[1].link}
                  size="small"
                  variant="outlined"
                  sx={{ color: '#fff', borderColor: '#fff', alignSelf: 'flex-start' }}
                >
                  En savoir +
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Laboratoire Médical / Infrastructures - alignés sur la même ligne */}
        <Grid container spacing={2} sx={{ mt: 6 }}>
          {facilities.map((facility) => (
            <Grid item xs={12} sm={6} key={facility.name}>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    backgroundImage: `url(${facility.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Box sx={{ bgcolor: facility.color, color: '#fff', p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {facility.name.toUpperCase()}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', opacity: 0.9, mb: 1.5 }}>
                    {facility.description}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={facility.link}
                    size="small"
                    variant="outlined"
                    sx={{ color: '#fff', borderColor: '#fff', fontSize: '0.7rem' }}
                  >
                    En savoir +
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default OurCampuses;
