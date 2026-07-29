import { Box, Container, Grid, Typography, Stack, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import HubIcon from '@mui/icons-material/Hub';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link as RouterLink } from 'react-router-dom';
import AnimatedSection from '../common/AnimatedSection'; // adaptez le chemin

// 4 points forts
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

const campuses = [
  {
    name: 'Campus Principal Vue de l\'interieur',
    description: "Situé au cœur de la ville, dans un cadre propice à l'apprentissage et à la pratique clinique",
    image: '/assets/campus/campus1.jpg',
    link: '/vie-au-campus/presentation',
    color: 'primary.main',
  },
  {
    name: 'Campus Principal Vue de l\'exterieur',
    description: 'Situé dans un environnement moderne et accessible aux structures de stage partenaires',
    image: '/assets/campus/campus2.jpg',
    link: '/vie-au-campus/presentation',
    color: 'primary.dark',
  },
];

const facilities = [
  {
    name: 'Laboratoire Médical',
    description: 'Des plateaux techniques équipés pour la simulation des pratiques cliniques et paramédicales',
    image: '/assets/equipement_infra/laboratoire.jpg',
    link: '/vie-au-campus/laboratoire',
    color: 'primary.main',
  },
  {
    name: 'Infrastructures',
    description: 'Des infrastructures modernes et sécurisées au service de la réussite des étudiants',
    image:  '/assets/equipement_infra/infrastructure.jpg',
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
          {/* Colonne gauche : titre + points forts - animation depuis la gauche */}
          <AnimatedSection direction="left" delay={0.1} sx={{ width: { xs: '100%', md: '41.6667%' }, flexShrink: 0 }}>
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
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-start"
                    key={index}
                    sx={{
                      // Animation de chaque point avec un délai progressif via Framer Motion ? 
                      // On peut les envelopper individuellement, mais pour simplifier on laisse l'ensemble de la colonne s'animer.
                      // Cependant, pour un effet cascade, on peut aussi utiliser AnimatedSection sur chaque élément.
                      // Je propose de les laisser tels quels, la colonne s'anime globalement.
                    }}
                  >
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
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                          transform: 'scale(1.1) rotate(5deg)',
                          boxShadow: '0 0 15px rgba(122,31,31,0.4)',
                        },
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
          </AnimatedSection>

          {/* Colonne droite : mosaïque - animation depuis la droite */}
          <AnimatedSection direction="right" delay={0.2} sx={{ width: { xs: '100%', md: '58.3333%' }, flexShrink: 0 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '300px 300px',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              {/* Cellule 1 : texte campus 0 */}
              <Box
                sx={{
                  bgcolor: campuses[0].color,
                  color: '#fff',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                  },
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

              {/* Cellule 2 : image campus 0 */}
              <Box
                sx={{
                  backgroundImage: `url(${campuses[0].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.4s, filter 0.4s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    filter: 'brightness(1.1)',
                  },
                }}
              />

              {/* Cellule 3 : image campus 1 */}
              <Box
                sx={{
                  backgroundImage: `url(${campuses[1].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.4s, filter 0.4s',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    filter: 'brightness(1.1)',
                  },
                }}
              />

              {/* Cellule 4 : texte campus 1 */}
              <Box
                sx={{
                  bgcolor: campuses[1].color,
                  color: '#fff',
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                  },
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
          </AnimatedSection>
        </Box>

        {/* Laboratoire / Infrastructures - chaque carte avec animation vers le haut */}
        <Grid container spacing={2} sx={{ mt: 6 }}>
          {facilities.map((facility, index) => (
            <Grid item xs={12} sm={6} key={facility.name}>
              <AnimatedSection direction="up" delay={0.3 + index * 0.15}>
                <Box
                  sx={{
                    height: 300,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 1,
                    overflow: 'hidden',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      backgroundImage: `url(${facility.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      transition: 'transform 0.5s',
                      '&:hover': {
                        transform: 'scale(1.08)',
                      },
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
              </AnimatedSection>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default OurCampuses;