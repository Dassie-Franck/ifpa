import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia 
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

// Données statiques temporaires — seront remplacées par l'API Laravel (/api/v1/actualites)
const articles = [
  {
    image: '/assets/actualites/actu-1.jpg',
    title: 'Journée portes ouvertes sur le campus',
    link: '/actualites/journee-portes-ouvertes',
  },
  {
    image: '/assets/actualites/actu-2.jpg',
    title: "Retour d'expérience d'une ancienne diplômée",
    link: '/actualites/retour-experience-diplomee',
  },
];

function LatestNews() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">

        {/* Petit titre ACTU */}
        <Typography
          variant="overline"
          display="block"
          sx={{
            color: 'warning.main',
            fontWeight: 700,
            letterSpacing: 2,
            mb: 0.5,
          }}
        >
          ACTU
        </Typography>


        {/* Titre principal */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: 'text.primary',
            mb: 3,
          }}
        >
          Dernières actualités
        </Typography>


        {/* Cartes actualités */}
        <Grid 
          container 
          spacing={3} 
          sx={{ mb: 3 }}
        >

          {articles.map((article) => (

            <Grid
              size={{ xs: 12, md: 6 }}
              key={article.link}
            >

              <Card
                component={RouterLink}
                to={article.link}
                sx={{
                  position: 'relative',
                  height: 260,
                  display: 'block',
                  textDecoration: 'none',
                  overflow: 'hidden',

                  '&:hover img': {
                    transform: 'scale(1.05)',
                  },
                }}
              >

                <CardMedia
                  component="img"
                  image={article.image}
                  alt={article.title}
                  sx={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />


                {/* Overlay sombre */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)',
                  }}
                />


                {/* Texte */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    p: 3,
                    color: '#fff',
                  }}
                >

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                    }}
                  >
                    {article.title}
                  </Typography>


                  <Typography
                    variant="caption"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      fontWeight: 700,
                      letterSpacing: 1,
                    }}
                  >
                    LIRE LA SUITE
                    <ArrowForwardIcon
                      sx={{
                        fontSize: 14,
                      }}
                    />

                  </Typography>

                </Box>

              </Card>

            </Grid>

          ))}

        </Grid>



        {/* Bannières promotionnelles */}
        <Grid 
          container 
          spacing={3}
        >

          <Grid size={{ xs: 12, md: 6 }}>

            <Box
              component={RouterLink}
              to="/admission"
              sx={{
                display: 'block',
                height: 260,
                backgroundImage:
                  'url(/assets/actualites/banniere-concours.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 1,
              }}
            />

          </Grid>


          <Grid size={{ xs: 12, md: 6 }}>

            <Box
              component={RouterLink}
              to="/institut"
              sx={{
                display: 'block',
                height: 260,
                backgroundImage:
                  'url(/assets/actualites/banniere-accreditation.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: 1,
                border: '1px solid #eee',
              }}
            />

          </Grid>

        </Grid>


      </Container>
    </Box>
  );
}

export default LatestNews;