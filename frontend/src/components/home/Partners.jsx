import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import useFetch from '../../hooks/useFetch';
import { contentService } from '../../services/contentService';

import 'swiper/css';

function Partners() {
  const { data: partners, loading } = useFetch(() => contentService.getPartenaires(), []);

  if (loading) {
    return (
      <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!partners || partners.length === 0) return null;

  return (
    <Box sx={{ py: 6, bgcolor: '#fafafa' }}>
      <Container maxWidth="lg">
        <Typography variant="overline" display="block" sx={{ color: 'text.secondary', letterSpacing: 2, mb: 0.5 }}>
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
          breakpoints={{ 600: { slidesPerView: 3 }, 900: { slidesPerView: 4 } }}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.id}>
              <Box
                component="img"
                src={partner.logo}
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