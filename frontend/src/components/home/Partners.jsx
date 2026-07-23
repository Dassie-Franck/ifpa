import { Box, Container, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

// Logos des structures de stage / partenaires institutionnels (§6.1, §8.6)
// Remplacez par les vrais partenaires de l'IFPA (hôpitaux, cliniques, ministères, ordres professionnels)
const partners = [
  { name: 'MINEFOP', logo: '/assets/partenariat/MINEFOP.jpg' },
  { name: 'MINSANTE', logo: '/assets/partenariat/minsante.jpeg' },
  { name: 'MINSUP', logo: '/assets/partenariat/minsup.jpeg' },

];

function Partners() {
  return (
    <Box sx={{ 
      py: { xs: 4, sm: 6, md: 8 }, 
      bgcolor: '#fafafa',
      borderTop: '1px solid #eee',
      borderBottom: '1px solid #eee'
    }}>
      <Container maxWidth="lg">
        <Typography
          variant="overline"
          display="block"
          sx={{ 
            color: 'text.secondary', 
            letterSpacing: 2, 
            mb: 0.5,
            fontSize: { xs: '0.7rem', sm: '0.75rem', md: '0.8rem' }
          }}
        >
          NOS PARTENAIRES
        </Typography>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 800, 
            color: 'primary.main', 
            mb: { xs: 3, sm: 4, md: 5 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          Ils nous font confiance
        </Typography>

        <Swiper
          modules={[Autoplay]}
          slidesPerView={2}
          spaceBetween={30}
          loop
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 30 },
            600: { slidesPerView: 3, spaceBetween: 40 },
            900: { slidesPerView: 4, spaceBetween: 50 },
            1200: { slidesPerView: 5, spaceBetween: 60 },
          }}
        >
          {partners.map((partner) => (
            <SwiperSlide key={partner.name}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: { xs: 80, sm: 100, md: 120 },
                  p: { xs: 1, sm: 2, md: 3 },
                  bgcolor: '#fff',
                  borderRadius: 2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={partner.logo}
                  alt={partner.name}
                  sx={{
                    height: { xs: 50, sm: 65, md: 80 },
                    width: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    // Suppression du filtre gris pour garder les couleurs originales
                    filter: 'none',
                    opacity: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Indicateur de défilement */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: { xs: 3, sm: 4 },
          gap: 1
        }}>
          {[...Array(3)].map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                opacity: 0.3,
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${index * 0.3}s`,
                '@keyframes pulse': {
                  '0%': { opacity: 0.3, transform: 'scale(1)' },
                  '50%': { opacity: 1, transform: 'scale(1.2)' },
                  '100%': { opacity: 0.3, transform: 'scale(1)' },
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Partners;