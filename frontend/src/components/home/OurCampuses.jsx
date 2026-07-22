import { Box, Container, Grid, Typography, Stack, Button } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import GroupsIcon from '@mui/icons-material/Groups';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Link as RouterLink } from 'react-router-dom';

// 4 points forts (§6.1) - icônes adaptées au domaine paramédical
const features = [
  {
    icon: SchoolIcon,
    text: "Des formations pluridisciplinaires où l'étudiant allie théorie et pratique, mais aussi savoir-faire et savoir-être",
  },
  {
    icon: ScienceIcon,
    text: 'Des plateaux techniques et laboratoires équipés à la pointe de la technologie, pour simuler les réalités hospitalières',
  },
  {
    icon: GroupsIcon,
    text: "Des clubs associatifs et des espaces de vie diversifiés pour l'épanouissement des étudiants",
  },
  {
    icon: ApartmentIcon,
    text: 'Des infrastructures sécurisées et équipées, avec un encadrement pédagogique de proximité',
  },
];

// Campus / antennes de formation - à remplacer par les vraies données IFPA
const campuses = [
  {
    name: 'Campus Principal',
    description: "Situé au cœur de la ville, dans un cadre propice à l'apprentissage et à la pratique clinique",
    image: '/assets/campus/campus-1.jpg',
    link: '/vie-au-campus/presentation',
    color: 'primary.main',
  },
  {
    name: 'Antenne 2',
    description: 'Situé dans un environnement moderne et accessible aux structures de stage partenaires',
    image: '/assets/campus/campus-2.jpg',
    link: '/vie-au-campus/presentation',
    color: 'primary.dark',
  },
];

function OurCampuses() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5} alignItems="flex-start">
          {/* Colonne gauche : titre + 4 points */}
          <Grid item xs={12} md={5}>
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
                        bgcolor: 'primary.main',
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
          </Grid>

          {/* Colonne droite : mosaïque photo + bandeau texte par campus */}
          <Grid item xs={12} md={7}>
            <Grid container spacing={2}>
              {campuses.map((campus, index) => (
                <Grid item xs={12} sm={6} key={campus.name}>
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
                        backgroundImage: `url(${campus.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <Box sx={{ bgcolor: campus.color, color: '#fff', p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {campus.name.toUpperCase()}
                      </Typography>
                      <Typography variant="caption" sx={{ display: 'block', opacity: 0.9, mb: 1.5 }}>
                        {campus.description}
                      </Typography>
                      <Button
                        component={RouterLink}
                        to={campus.link}
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default OurCampuses;