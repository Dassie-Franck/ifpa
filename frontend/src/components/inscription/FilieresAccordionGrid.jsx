import { useState } from 'react';
import { Box, Container, Grid, Typography, Stack, Collapse } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { motion } from 'framer-motion';

// Filières ouvertes au dépôt de dossier (§6.4/§6.5) — reprend les filières
// définies sur la page Formation ; à synchroniser avec l'API Laravel plus tard
const filieres = [
  {
    title: 'Délégué Médical',
    resume: "Formation de 1 an préparant aux métiers de la visite médicale, du conseil pharmaceutique et de la gestion de secteur. Alternance entre cours théoriques et stages pratiques en entreprise.",
    niveau: 'BACC +2, 3, 4',
    prix: '400 000 FCFA',
    debouches: ['Consultant / Formateur', 'Chef de produit', 'Responsable de région']
  },
  {
    title: 'Vendeur en Pharmacie',
    resume: "Formation de 1 an dédiée à la vente et au conseil en officine, à l'assistance pharmaceutique et à la gestion de point de vente.",
    niveau: 'PROBATOIRE (toutes filières)',
    prix: '250 000 FCFA',
    debouches: ['Assistant en pharmacie', 'Préparateur en pharmacie', 'Gestionnaire de point de vente']
  },
  {
    title: 'Auxiliaire de Vie',
    resume: "Formation de 1 an centrée sur l'accompagnement des personnes âgées, dépendantes ou en situation de handicap dans les actes de la vie quotidienne.",
    niveau: 'BEPC',
    prix: '250 000 FCFA',
    debouches: ['Structures d\'aide à domicile', 'Collectivités locales', 'Travail indépendant']
  },
  {
    title: 'Assistant en Cabinet Médical',
    resume: "Formation de 1 an préparant à l'accueil, la gestion administrative et l'assistance médicale dans les cabinets, cliniques et centres de santé.",
    niveau: 'BEPC et PLUS (toutes filières)',
    prix: '250 000 FCFA',
    debouches: ['Cabinets médicaux', 'Cliniques et hôpitaux', 'Centres de santé']
  },
  {
    title: 'Aide Chimiste Biologiste',
    resume: "Formation de 1 an orientée vers les analyses biologiques, les techniques de laboratoire et le contrôle qualité dans le domaine paramédical.",
    niveau: 'BEPC et PLUS (toutes filières)',
    prix: '250 000 FCFA',
    debouches: ['Technicien de laboratoire', 'Assistant de recherche', 'Contrôle qualité']
  }
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