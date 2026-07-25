import { Box, Container, Typography, Avatar, IconButton, Stack, CircularProgress } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import useFetch from '../../hooks/useFetch';
import { contentService } from '../../services/contentService';

import 'swiper/css';
import 'swiper/css/navigation';

function Testimonials() {
  const { data: testimonials, loading } = useFetch(() => contentService.getTemoignages(), []);

  if (loading) {
    return (
      <Box sx={{ bgcolor: 'primary.dark', py: 6, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    );
  }

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <Box sx={{ bgcolor: 'primary.dark', color: '#fff', py: 6, position: 'relative' }}>
      <Container maxWidth="md">
        <Typography variant="overline" display="block" textAlign="center" sx={{ opacity: 0.8, letterSpacing: 2, mb: 0.5 }}>
          RETOURS
        </Typography>
        <Typography variant="h4" textAlign="center" sx={{ fontWeight: 800, mb: 4 }}>
          Quelques témoignages
        </Typography>

        <Swiper modules={[Navigation]} navigation={{ prevEl: '.testi-prev', nextEl: '.testi-next' }} loop>
          {testimonials.map((t) => (
            <SwiperSlide key={t.id}>
              <Stack alignItems="center" textAlign="center" spacing={2} sx={{ px: { xs: 2, md: 8 } }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.8, opacity: 0.95 }}>
                  « {t.citation} »
                </Typography>
                <Avatar src={t.photo} alt={t.nom} sx={{ width: 72, height: 72 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {t.nom}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {t.promotion} {t.filiere ? `— ${t.filiere.titre}` : ''}
                  </Typography>
                </Box>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>

        <IconButton className="testi-prev" sx={{ position: 'absolute', left: { xs: 4, md: 24 }, top: '50%', transform: 'translateY(-50%)', color: '#fff' }}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton className="testi-next" sx={{ position: 'absolute', right: { xs: 4, md: 24 }, top: '50%', transform: 'translateY(-50%)', color: '#fff' }}>
          <ArrowForwardIosIcon />
        </IconButton>

        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mt: 4 }}>
          <IconButton size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}><TwitterIcon sx={{ fontSize: 18 }} /></IconButton>
          <IconButton size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}><FacebookIcon sx={{ fontSize: 18 }} /></IconButton>
          <IconButton size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}><InstagramIcon sx={{ fontSize: 18 }} /></IconButton>
          <IconButton size="small" sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.4)' }}><LinkedInIcon sx={{ fontSize: 18 }} /></IconButton>
        </Stack>
      </Container>
    </Box>
  );
}

export default Testimonials;