import { Box, Container, Typography, Grid, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const items = [
  'Formation professionnalisante et humaine',
  'Insertion professionnelle rapide',
  'Plateaux techniques équipés',
  'Accompagnement individualisé',
  'Réseau de stages hospitaliers',
  'Encadrement de proximité',
];

function WhyChooseUs() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">

        <Typography
          variant="overline"
          display="block"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            letterSpacing: 2,
            mb: 1
          }}
        >
          1 ESPRIT 2 CAMPUS 4 FILIÈRES
        </Typography>


        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            color: 'primary.main',
            fontWeight: 800,
            mb: 2
          }}
        >
          Pourquoi choisir l'Institut IFPA
        </Typography>


        <Typography
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            maxWidth: 760,
            mx: 'auto',
            mb: 4
          }}
        >
          Institut de formation professionnelle spécialisé dans le domaine paramédical.
          Nous formons des hommes et des femmes techniquement compétents et humainement
          responsables pour répondre aux besoins des structures de santé et de la société !
        </Typography>


        <Grid 
          container 
          spacing={2}
          sx={{ justifyContent:'center' }}
        >

          {items.map((item) => (

            <Grid
              size={{ xs:12, sm:6, md:4 }}
              key={item}
            >

              <Stack 
                direction="row" 
                spacing={1} 
                sx={{ alignItems:'flex-start' }}
              >

                <CheckCircleIcon 
                  sx={{
                    color:'#2E9E4F',
                    fontSize:20,
                    mt:0.3
                  }}
                />

                <Typography 
                  variant="body2"
                  sx={{ color:'text.primary' }}
                >
                  {item}
                </Typography>

              </Stack>

            </Grid>

          ))}

        </Grid>

      </Container>
    </Box>
  );
}

export default WhyChooseUs;