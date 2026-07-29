import { useState } from 'react';
import { Box, Container, Grid, Tabs, Tab, CircularProgress, Alert } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { motion, AnimatePresence } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import { contentService } from '../../services/contentService';
import VideoPlayer from './VideoPlayer';

const categories = [
  { value: '', label: 'Tout' },
  { value: 'locaux', label: 'Locaux' },
  { value: 'evenements', label: 'Événements' },
  { value: 'vie_etudiante', label: 'Vie étudiante' },
  { value: 'remise_diplomes', label: 'Remise de diplômes' },
];

function GalleryGrid() {
  const [categorie, setCategorie] = useState('');
  const [activeVideo, setActiveVideo] = useState(null);

  const { data: items, loading, error } = useFetch(
    () => contentService.getGalerie(categorie),
    [categorie]
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Tabs
        value={categorie}
        onChange={(e, val) => setCategorie(val)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{ mb: 4 }}
      >
        {categories.map((cat) => (
          <Tab key={cat.value} label={cat.label} value={cat.value} />
        ))}
      </Tabs>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && <Alert severity="error">Impossible de charger la galerie.</Alert>}

      {!loading && !error && (
        <Grid container spacing={2}>
          {items?.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Box
                  onClick={() => item.type === 'video' && setActiveVideo(item)}
                  sx={{
                    position: 'relative',
                    height: 220,
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: item.type === 'video' ? 'pointer' : 'default',
                  }}
                >
                  {item.type === 'photo' ? (
                    <Box
                      component="img"
                      src={item.fichier}
                      alt={item.titre || 'Photo IFPA'}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        bgcolor: '#1a1a1a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PlayCircleIcon sx={{ fontSize: 56, color: '#fff', opacity: 0.9 }} />
                    </Box>
                  )}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && !error && items?.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary' }}>
          Aucun média dans cette catégorie pour le moment.
        </Box>
      )}

      {/* Modale de lecture vidéo */}
      {activeVideo && (
        <Box
          onClick={() => setActiveVideo(null)}
          sx={{
            position: 'fixed',
            inset: 0,
            bgcolor: 'rgba(0,0,0,0.85)',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{ width: '100%', maxWidth: 800, aspectRatio: '16/9' }}
          >
            <VideoPlayer item={activeVideo} />
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default GalleryGrid;