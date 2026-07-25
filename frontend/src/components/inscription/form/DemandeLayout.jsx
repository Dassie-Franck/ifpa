import { Box, Grid } from '@mui/material';
import PersonalInfoStep from './PersonalInfoStep';
import ProgressionSidebar from './ProgressionSidebar';

// Étapes affichées dans la sidebar — à adapter selon votre parcours réel
const STEPS = [
  'Informations personnelles',
  'Informations complémentaires',
  'Concours',
  'Paiement',
];

// Conteneur principal du parcours : formulaire à gauche (8/12), progression à droite (4/12)
function DemandeLayout({ formData, setFormData, activeStep = 0 }) {
  return (
    <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
      <Grid container spacing={4}>
        {/* Colonne gauche : formulaire (change selon l'étape active) */}
        <Grid item xs={12} md={8}>
          <PersonalInfoStep formData={formData} setFormData={setFormData} />
        </Grid>

        {/* Colonne droite : progression */}
        <Grid item xs={12} md={4}>
          <ProgressionSidebar steps={STEPS} activeStep={activeStep} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default DemandeLayout;
