import { Box, Container, Typography, Grid, Stack, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { contentService } from '../../services/contentService';

function UpcomingEvents() {
  const { data: events, loading } = useFetch(() => contentService.getEvenements(), []);
  const upcomingTwo = events?.slice(0, 2) || [];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (upcomingTwo.length === 0) return null;

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="overline" display="block" sx={{ color: 'text.secondary', letterSpacing: 2, mb: 0.5 }}>
          ÉVÈNEMENTS À VENIR
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 4 }}>
          Les évènements majeurs à venir
        </Typography>

        <Grid container spacing={4}>
          {upcomingTwo.map((event) => {
            const date = new Date(event.date_debut);
            const dateLabel = date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });

            return (
              <Grid item xs={12} sm={6} key={event.id}>
                <Stack
                  direction="row"
                  spacing={2}
                  component={RouterLink}
                  to={`/vie-au-campus/evenements/${event.slug}`}
                  sx={{ textDecoration: 'none', alignItems: 'center' }}
                >
                  <Box
                    sx={{
                      width: 90,
                      height: 90,
                      flexShrink: 0,
                      borderRadius: 1,
                      backgroundImage: `url(${event.image_couverture || '/assets/evenements/placeholder.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box>
                    <Typography variant="body2" sx={{ color: 'primary.main', fontWeight: 700, mb: 0.5 }}>
                      [ {event.campus?.nom || event.lieu || 'IFPA'} ]
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                      {dateLabel}: {event.titre}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default UpcomingEvents;