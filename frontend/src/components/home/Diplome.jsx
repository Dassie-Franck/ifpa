import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

function Partners() {
  // Données statiques pour les deux partenaires
  const partners = [
    { id: 1, nom: 'DQP', image: '/assets/partenaires/dqp.png' },
    { id: 2, nom: 'CQP', image: '/assets/partenaires/cqp.png' },
  ];

  return (
    <Box sx={{ py: 6, bgcolor: '#fafafa' }}>
      <Container maxWidth="lg">
        <Typography variant="overline" display="block" sx={{ color: 'text.secondary', letterSpacing: 2, mb: 0.5 }}>
          DIPLOME DE QUALITER DELIVRER ET AGREER PAR LE MINISTERE DE LA SANTE
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 4 }}>
          NOS DIPLOME DELIVRER !!!!
        </Typography>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={40}
          loop
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{ 600: { slidesPerView: 2 }, 900: { slidesPerView: 2 } }}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <Box
                component="img"
                src={partner.image}
                alt={partner.nom}
                sx={{
                  height: 120,
                  width: 'auto',
                  maxWidth: '100%',
                  mx: 'auto',
                  display: 'block',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}

export default Partners;