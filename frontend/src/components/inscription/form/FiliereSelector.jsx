import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';
import useFetch from '../../../hooks/useFetch';
import { filiereService } from '../../../services/filiereService';

function FiliereSelector({ selectedId, onSelect }) {
  const { data: filieres, loading } = useFetch(() => filiereService.getAll(), []);

  if (loading) {
    return <CircularProgress size={24} />;
  }

  return (
    <Grid container spacing={1.5}>
      {filieres?.map((filiere, index) => {
        const isSelected = selectedId === filiere.id;
        return (
          <Grid item xs={12} sm={6} key={filiere.id}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Box
                onClick={() => onSelect(filiere.id, filiere.titre)}
                sx={{
                  border: '2px solid',
                  borderColor: isSelected ? 'primary.main' : '#eee',
                  bgcolor: isSelected ? '#fff5ec' : '#fff',
                  borderRadius: 1,
                  p: 2,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s ease',
                }}
              >
                <Typography sx={{ fontWeight: 600 }}>{filiere.titre}</Typography>
                {isSelected && <CheckCircleIcon sx={{ color: 'primary.main' }} />}
              </Box>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default FiliereSelector;