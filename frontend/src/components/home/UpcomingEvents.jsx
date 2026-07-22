import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// Données statiques temporaires — seront remplacées par l'API Laravel (/api/v1/evenements)
const events = [
  {
    image: '/assets/evenements/evenement-1.jpg',
    lieu: 'Campus Principal',
    date: '06 Oct',
    title: 'Rentrée des nouveaux étudiants',
    link: '/vie-au-campus/rentree-2026',
  },
  {
    image: '/assets/evenements/evenement-2.jpg',
    lieu: 'Campus Principal',
    date: '15 Sep',
    title: "Journée portes ouvertes — Filières paramédicales",
    link: '/admission/journee-portes-ouvertes',
  },
];

function UpcomingEvents() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          display="block"
          sx={{ color: 'text.secondary', letterSpacing: 2, mb: 0.5 }}
        >
          ÉVÈNEMENTS À VENIR
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 4 }}>
          Les évènements majeurs à venir
        </Typography>

        <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item xs={12} sm={6} key={event.link}>
              <Stack
                direction="row"
                spacing={2}
                component={RouterLink}
                to={event.link}
                sx={{ textDecoration: 'none', alignItems: 'center' }}
              >
                <Box
                  sx={{
                    width: 90,
                    height: 90,
                    flexShrink: 0,
                    borderRadius: 1,
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: 'primary.main', fontWeight: 700, mb: 0.5 }}
                  >
                    [ {event.lieu} ]
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {event.date}: {event.title}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default UpcomingEvents;