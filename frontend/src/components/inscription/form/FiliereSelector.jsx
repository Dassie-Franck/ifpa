import { Box, Typography, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

// Filières disponibles au dépôt de dossier — à synchroniser avec l'API Laravel (/api/v1/filieres)
const filieresList = [
  'Soins infirmiers',
  'Aide-soignant',
  'Sage-femme',
  'Technicien de laboratoire',
];

function FiliereSelector({ selected, onSelect }) {
  return (
    <Grid container spacing={1.5}>
      {filieresList.map((filiere, index) => {
        const isSelected = selected === filiere;
        return (
          <Grid item xs={12} sm={6} key={filiere}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Box
                onClick={() => onSelect(filiere)}
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
                <Typography sx={{ fontWeight: 600 }}>{filiere}</Typography>
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