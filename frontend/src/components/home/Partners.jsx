import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

// Logos des structures de stage / partenaires institutionnels (§6.1, §8.6)
// Remplacez par les vrais partenaires de l'IFPA (hôpitaux, cliniques, ministères, ordres professionnels)
const partners = [
  { name: 'Partenaire 1', logo: '/assets/partenaires/partenaire-1.png' },
  { name: 'Partenaire 2', logo: '/assets/partenaires/partenaire-2.png' },
  { name: 'Partenaire 3', logo: '/assets/partenaires/partenaire-3.png' },
  { name: 'Partenaire 4', logo: '/assets/partenaires/partenaire-4.png' },
  { name: 'Partenaire 5', logo: '/assets/partenaires/partenaire-5.png' },
  { name: 'Partenaire 6', logo: '/assets/partenaires/partenaire-6.png' },
];

function Partners() {
  return (
    <Box sx={{ py: 6, bgcolor: '#fafafa' }}>
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          display="block"
          sx={{ color: 'text.secondary', letterSpacing: 2, mb: 0.5 }}
        >
          NOS PARTENAIRES
        </Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', mb: 4 }}>
          Ils nous font confiance
        </Typography>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={40}
          loop
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            600: { slidesPerView: 3 },
            900: { slidesPerView: 4 },
          }}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.name}>
              <Box
                component="img"
                src={partner.logo}
                alt={partner.name}
                sx={{
                  height: 60,
                  width: 'auto',
                  maxWidth: '100%',
                  mx: 'auto',
                  display: 'block',
                  filter: 'grayscale(100%)',
                  opacity: 0.75,
                  transition: 'all 0.3s ease',
                  '&:hover': { filter: 'grayscale(0%)', opacity: 1 },
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