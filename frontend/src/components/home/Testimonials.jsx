import { Box, Container, Typography, Avatar, IconButton, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import 'swiper/css';
import 'swiper/css/navigation';

// Témoignages d'étudiants et d'anciens diplômés (§6.6) — données statiques temporaires,
// seront remplacées par l'API Laravel (/api/v1/temoignages)
const testimonials = [
  {
    quote:
      "Au-delà de la formation académique, l'IFPA est aussi un espace de vie, de rencontre et de découverte. J'y ai vécu une expérience profondément humaine, entourée d'un encadrement de proximité et de stages pratiques qui m'ont préparée au métier.",
    name: 'Amina N.',
    detail: 'Promotion 2024 — Soins infirmiers',
    photo: '/assets/temoignages/temoignage-1.jpg',
  },
  {
    quote:
      "L'une des plus belles choses que j'ai vécues à l'IFPA, c'est l'accompagnement individualisé. Les formateurs sont disponibles, exigeants et bienveillants. Aujourd'hui, je suis en poste dans une clinique partenaire de l'institut.",
    name: 'Jean-Paul K.',
    detail: 'Alumni 2022 — Technicien de laboratoire',
    photo: '/assets/temoignages/temoignage-2.jpg',
  },
];

function Testimonials() {
  return (
    <Box sx={{ bgcolor: 'primary.dark', color: '#fff', py: 6, position: 'relative' }}>
      <Container maxWidth="md">
        <Typography
          variant="overline"
          display="block"
          textAlign="center"
          sx={{ opacity: 0.8, letterSpacing: 2, mb: 0.5 }}
        >
          RETOURS
        </Typography>
        <Typography variant="h4" textAlign="center" sx={{ fontWeight: 800, mb: 4 }}>
          Quelques témoignages
        </Typography>

        <Swiper
          modules={[Navigation]}
          navigation={{ prevEl: '.testi-prev', nextEl: '.testi-next' }}
          loop
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.name}>
              <Stack alignItems="center" textAlign="center" spacing={2} sx={{ px: { xs: 2, md: 8 } }}>
                <Typography
                  variant="body1"
                  sx={{ fontStyle: 'italic', lineHeight: 1.8, opacity: 0.95 }}
                >
                  « {t.quote} »
                </Typography>
                <Avatar src={t.photo} alt={t.name} sx={{ width: 72, height: 72 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {t.name}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {t.detail}
                  </Typography>
                </Box>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Flèches navigation */}
        <IconButton
          className="testi-prev"
          sx={{
            position: 'absolute',
            left: { xs: 4, md: 24 },
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          className="testi-next"
          sx={{
            position: 'absolute',
            right: { xs: 4, md: 24 },
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#fff',
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        {/* Icônes réseaux sociaux */}
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 4 }}>
          <IconButton size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}>
            <TwitterIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}>
            <FacebookIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}>
            <InstagramIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}>
            <LinkedInIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  );
}

export default Testimonials;