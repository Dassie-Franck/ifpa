import { Box, Typography, Button, Paper } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link as RouterLink } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Chaque slide = un visuel + une accroche institutionnelle.
// Remplacez "image" par le chemin de vos propres visuels (public/assets/hero/...)
const slides = [
  {
    image: '/assets/hero/hero1.jpg',
    title: '1er concours : admissions 2026-2027',
    cta: 'Résultats définitifs',
    ctaLink: '/admission',
  },
  {
    image: '/assets/hero/hero2.jpg',
    title: 'Des filières paramédicales reconnues',
    cta: "Découvrir nos formations",
    ctaLink: '/formation',
  },
  {
    image: '/assets/hero/hero3.jpg',
    title: "Rejoignez l'IFPA dès la rentrée 2026",
    cta: "Je m'inscris",
    ctaLink: '/admission',
  },
];

function HeroSlider() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation={{
          prevEl: '.hero-prev',
          nextEl: '.hero-next',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        style={{ width: '100%' }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                position: 'relative',
                height: { xs: 320, sm: 420, md: 520 },
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-end' },
                px: { xs: 3, md: 10 },
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.55)',
                  backdropFilter: 'blur(2px)',
                  p: { xs: 2.5, md: 4 },
                  maxWidth: 420,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, color: '#1a1a1a', mb: 3, lineHeight: 1.2 }}
                >
                  {slide.title}
                </Typography>
                <Button
                  component={RouterLink}
                  to={slide.ctaLink}
                  variant="contained"
                  color="primary"
                  sx={{ fontWeight: 700, px: 3 }}
                >
                  {slide.cta}
                </Button>
              </Paper>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Flèches navigation personnalisées */}
      <Box
        className="hero-prev"
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          cursor: 'pointer',
          color: '#fff',
          bgcolor: 'rgba(0,0,0,0.25)',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.45)' },
        }}
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
      </Box>
      <Box
        className="hero-next"
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 24 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10,
          cursor: 'pointer',
          color: '#fff',
          bgcolor: 'rgba(0,0,0,0.25)',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&:hover': { bgcolor: 'rgba(0,0,0,0.45)' },
        }}
      >
        <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
      </Box>
    </Box>
  );
}

export default HeroSlider;