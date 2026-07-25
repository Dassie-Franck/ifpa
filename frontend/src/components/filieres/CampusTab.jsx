import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import useFetch from '../../hooks/useFetch';
import api from '../../services/api';

function CampusTab() {
  const { data: campusList, loading } = useFetch(
    () => api.get('/campus').then((res) => res.data.data),
    []
  );

  return (
    <Box>
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <Box sx={{ bgcolor: '#f0f0f0', px: 3, py: 2, mb: 3 }}>
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Campus
          </Typography>
        </Box>
      </motion.div>

      {loading && <CircularProgress size={24} />}

      <Grid container spacing={2}>
        {campusList?.map((campus) => (
          <Grid item xs={12} sm={6} key={campus.id}>
            <Box
              sx={{
                border: '1px solid #eee',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              {campus.image_couverture && (
                <Box
                  component="img"
                  src={campus.image_couverture}
                  alt={campus.nom}
                  sx={{ width: '100%', height: 160, objectFit: 'cover' }}
                />
              )}
              <Box sx={{ p: 2 }}>
                <Typography sx={{ fontWeight: 700 }}>{campus.nom}</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {campus.ville}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default CampusTab;