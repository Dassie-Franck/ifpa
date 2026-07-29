import { Box, Container, Typography, Avatar, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/navigation';

function PartnerTestimonials({ partenariats }) {
  const avecTemoignage = partenariats.filter((p) => p.temoignage_citation);

  if (avecTemoignage.length === 0) return null;

  return (
    <Box sx={{ bgcolor: 'primary.dark', color: '#fff', py: 6 }}>
      <Container maxWidth="md">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Typography variant="overline" display="block" textAlign="center" sx={{ opacity: 0.8, letterSpacing: 2, mb: 0.5 }}>
            ILS TÉMOIGNENT
          </Typography>
          <Typography variant="h4" textAlign="center" sx={{ fontWeight: 800, mb: 4 }}>
            La parole à nos partenaires
          </Typography>
        </motion.div>

        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop
        >
          {avecTemoignage.map((p) => (
            <SwiperSlide key={p.id}>
              <Stack alignItems="center" textAlign="center" spacing={2} sx={{ px: { xs: 2, md: 8 } }}>
                <Typography variant="body1" sx={{ fontStyle: 'italic', lineHeight: 1.8, opacity: 0.95 }}>
                  « {p.temoignage_citation} »
                </Typography>
                <Avatar src={p.temoignage_photo} alt={p.temoignage_auteur} sx={{ width: 64, height: 64 }} />
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    {p.temoignage_auteur}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {p.nom_structure}
                  </Typography>
                </Box>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
}

export default PartnerTestimonials;