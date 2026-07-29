import { Box, Container, Grid, Typography, Stack, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import { motion } from 'framer-motion';

// Pièces justificatives à fournir pour toutes les filières
const documentColumns = [
  {
    category: 'Toutes filières',
    subtitle: 'Pièces obligatoires du dossier',
    documents: [
      { label: "Demande d'admission manuscrite", detail: 'Adressée à la directrice' },
      { label: 'Diplôme / Relevé de notes', detail: 'Ou bordereau de réussite' },
      { label: 'Acte de naissance', detail: 'Photocopie' },
      { label: "Carte nationale d'identité", detail: 'Photocopie' },
      { label: "2 photos d'identité 4x4", detail: 'Moins de 3 mois' },
    ],
  },
  {
    category: 'Délégué Médical',
    subtitle: "Conditions d'admission",
    documents: [
      { label: 'Niveau requis', detail: 'BACC +2, 3, 4' },
      { label: "Frais d'inscription", detail: '400 000 FCFA' },
    ],
  },
  {
    category: 'Vendeur en Pharmacie',
    subtitle: "Conditions d'admission",
    documents: [
      { label: 'Niveau requis', detail: 'PROBATOIRE (toutes filières)' },
      { label: "Frais d'inscription", detail: '250 000 FCFA' },
    ],
  },
  {
    category: 'Auxiliaire de Vie',
    subtitle: "Conditions d'admission",
    documents: [
      { label: 'Niveau requis', detail: 'BEPC' },
      { label: "Frais d'inscription", detail: '250 000 FCFA' },
    ],
  },
  {
    category: 'Assistant en Cabinet Médical',
    subtitle: "Conditions d'admission",
    documents: [
      { label: 'Niveau requis', detail: 'BEPC et PLUS (toutes filières)' },
      { label: "Frais d'inscription", detail: '250 000 FCFA' },
    ],
  },
  {
    category: 'Aide Chimiste Biologiste',
    subtitle: "Conditions d'admission",
    documents: [
      { label: 'Niveau requis', detail: 'BEPC et PLUS (toutes filières)' },
      { label: "Frais d'inscription", detail: '250 000 FCFA' },
    ],
  },
];

function RequiredDocuments() {
  return (
    <Box sx={{ 
      py: { xs: 4, sm: 5, md: 6 },
      px: { xs: 1, sm: 2, md: 0 }
    }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Stack 
            direction="row" 
            spacing={1} 
            alignItems="center" 
            sx={{ 
              mb: { xs: 2.5, sm: 3, md: 4 },
              px: { xs: 1, sm: 0 }
            }}
          >
            <ChevronRightIcon sx={{ 
              color: 'secondary.main',
              fontSize: { xs: 20, sm: 24, md: 28 }
            }} />
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800,
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' }
              }}
            >
              Pièces à fournir
            </Typography>
          </Stack>
        </motion.div>

        <Grid 
          container 
          spacing={{ xs: 1.5, sm: 2, md: 3 }}
          sx={{
            justifyContent: { xs: 'center', sm: 'flex-start' }
          }}
        >
          {documentColumns.map((column, colIndex) => (
            <Grid 
              item 
              xs={6} 
              sm={6} 
              md={6} 
              lg={6}
              xl={6}
              key={column.category}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: colIndex * 0.12, ease: 'easeOut' }}
                style={{ 
                  height: '100%', 
                  width: '100%',
                  maxWidth: '100%'
                }}
              >
                <Box sx={{ 
                  bgcolor: '#fafafa', 
                  border: '1px solid #eee', 
                  height: '100%',
                  width: '100%',
                  borderRadius: { xs: 1, sm: 1, md: 1 },
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  '&:hover': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transform: 'translateY(-4px)'
                  }
                }}>
                  <Box sx={{ 
                    p: { xs: 1.5, sm: 2, md: 2.5 }, 
                    borderBottom: '1px solid #eee',
                    bgcolor: '#f5f5f5',
                    flexShrink: 0
                  }}>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: 'text.secondary', 
                        fontWeight: 600,
                        display: 'block',
                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.75rem' },
                        mb: 0.5,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}
                    >
                      {column.category}
                    </Typography>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: 'primary.main', 
                        fontWeight: 700,
                        fontSize: { xs: '0.7rem', sm: '0.85rem', md: '0.9rem' },
                        lineHeight: 1.3
                      }}
                    >
                      {column.subtitle}
                    </Typography>
                  </Box>

                  <Stack 
                    divider={<Divider />}
                    sx={{ 
                      flex: 1,
                      justifyContent: 'center'
                    }}
                  >
                    {column.documents.map((doc, docIndex) => (
                      <Stack
                        key={doc.label}
                        direction="row"
                        spacing={1.5}
                        alignItems="flex-start"
                        sx={{ 
                          px: { xs: 1.5, sm: 2, md: 2.5 }, 
                          py: { xs: 1, sm: 1.5, md: 1.8 },
                          transition: 'background-color 0.2s ease',
                          '&:hover': {
                            bgcolor: 'rgba(0,0,0,0.02)'
                          },
                          minHeight: { xs: '60px', sm: '70px', md: '80px' }
                        }}
                      >
                        <DescriptionIcon sx={{ 
                          fontSize: { xs: 14, sm: 18, md: 20 }, 
                          color: 'secondary.main', 
                          flexShrink: 0,
                          mt: 0.3
                        }} />
                        <Box sx={{ 
                          minWidth: 0,
                          flex: 1
                        }}>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              fontWeight: 600,
                              fontSize: { xs: '0.7rem', sm: '0.85rem', md: '0.875rem' },
                              wordBreak: 'break-word',
                              lineHeight: 1.2
                            }}
                          >
                            {doc.label}
                          </Typography>
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: 'text.secondary',
                              display: 'block',
                              fontSize: { xs: '0.6rem', sm: '0.75rem', md: '0.8rem' },
                              mt: 0.2,
                              lineHeight: 1.2
                            }}
                          >
                            {doc.detail}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default RequiredDocuments;