import { Box, Container, Grid, Typography, Stack, Divider } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DescriptionIcon from '@mui/icons-material/Description';
import { motion } from 'framer-motion';

// Pièces justificatives à fournir selon la catégorie de filière (§6.4 du cahier des charges)
// Chaque colonne reprend la structure visuelle "1er Cycle / 2ème Cycle" du template de référence,
// adaptée à des catégories de filières paramédicales.
const documentColumns = [
  {
    category: 'Toutes filières',
    subtitle: 'Documents communs obligatoires',
    documents: [
      { label: "Acte de naissance", detail: 'Copie légalisée' },
      { label: 'Certificat médical', detail: "Moins de 3 mois" },
      { label: "Photo d'identité", detail: 'Format numérique' },
      { label: "Pièce d'identité", detail: 'CNI ou carte scolaire' },
    ],
  },
  {
    category: 'Soins infirmiers',
    subtitle: 'Documents spécifiques',
    documents: [
      { label: 'Diplôme requis', detail: 'BEPC ou équivalent' },
      { label: 'Relevé de notes', detail: 'Dernière classe suivie' },
      { label: 'Lettre de motivation', detail: 'Facultative' },
    ],
  },
  {
    category: 'Sage-femme',
    subtitle: 'Documents spécifiques',
    documents: [
      { label: 'Diplôme requis', detail: 'BAC ou équivalent' },
      { label: 'Relevé de notes', detail: 'Classe de terminale' },
      { label: 'Certificat de scolarité', detail: 'Année en cours' },
    ],
  },
  {
    category: 'Technicien de laboratoire',
    subtitle: 'Documents spécifiques',
    documents: [
      { label: 'Diplôme requis', detail: 'BAC scientifique' },
      { label: 'Relevé de notes', detail: 'Classe de terminale' },
      { label: 'Certificat de scolarité', detail: 'Année en cours' },
    ],
  },
];

function RequiredDocuments() {
  return (
    <Box sx={{ py: 6 }}>
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
              Pièces à fournir
            </Typography>
          </Stack>
        </motion.div>

        <Grid container spacing={2}>
          {documentColumns.map((column, colIndex) => (
            <Grid item xs={12} sm={6} md={3} key={column.category}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: colIndex * 0.12, ease: 'easeOut' }}
                style={{ height: '100%' }}
              >
                <Box sx={{ bgcolor: '#fafafa', border: '1px solid #eee', height: '100%' }}>
                  <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                    <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {column.category}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 700 }}>
                      {column.subtitle}
                    </Typography>
                  </Box>

                  <Stack divider={<Divider />}>
                    {column.documents.map((doc, docIndex) => (
                      <Stack
                        key={doc.label}
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{ px: 2, py: 1.5 }}
                      >
                        <DescriptionIcon sx={{ fontSize: 18, color: 'secondary.main', flexShrink: 0 }} />
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {doc.label}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
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