import { useState } from 'react';
import { Box, Container, Grid, Typography, Stack, Collapse } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion } from 'framer-motion';

// Filières ouvertes au dépôt de dossier (§6.4/§6.5) — reprend les filières
// définies sur la page Formation ; à synchroniser avec l'API Laravel plus tard
const filieres = [
  {
    title: 'Soins infirmiers',
    resume: "Formation de 3 ans préparant aux soins infirmiers généraux, en alternance théorie/pratique hospitalière.",
  },
  {
    title: 'Aide-soignant',
    resume: "Formation de 1 an préparant à l'accompagnement des patients dans les actes de la vie quotidienne.",
  },
  {
    title: 'Sage-femme',
    resume: "Formation de 3 ans dédiée au suivi de grossesse, à l'accouchement et aux soins post-natals.",
  },
  {
    title: 'Technicien de laboratoire',
    resume: "Formation de 2 ans axée sur les analyses médicales et le diagnostic biologique.",
  },
];

function FilieresAccordionGrid() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Box sx={{ py: 6, bgcolor: '#fafafa' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 4 }}>
            <ChevronRightIcon sx={{ color: 'secondary.main' }} />
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Nos filières
            </Typography>
          </Stack>
        </motion.div>

        <Grid container spacing={2}>
          {filieres.map((filiere, index) => (
            <Grid item xs={12} md={6} key={filiere.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
              >
                <Box
                  onClick={() => handleToggle(index)}
                  sx={{
                    bgcolor: '#fff',
                    border: '1px solid #eee',
                    boxShadow: openIndex === index ? '0 4px 16px rgba(0,0,0,0.08)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1.5}
                    alignItems="center"
                    sx={{ p: 2.5 }}
                  >
                    <motion.div
                      animate={{ rotate: openIndex === index ? 90 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRightIcon sx={{ color: 'secondary.main' }} />
                    </motion.div>
                    <Typography sx={{ fontWeight: 700 }}>{filiere.title}</Typography>
                  </Stack>

                  <Collapse in={openIndex === index}>
                    <Box sx={{ px: 2.5, pb: 2.5, pl: 6 }}>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {filiere.resume}
                      </Typography>
                    </Box>
                  </Collapse>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FilieresAccordionGrid;