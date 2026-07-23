import { Box, Typography, Grid, Chip, Stack, FormControl, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import PublicIcon from '@mui/icons-material/Public';
import PlaceIcon from '@mui/icons-material/Place';
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ValidatedTextField from './ValidatedTextField';

// Validation simple : un champ est valide s'il n'est pas vide (règles plus fines
// - format téléphone, âge minimum, etc. - à affiner avec react-hook-form + yup
// une fois le back-end connecté pour les règles métier réelles).
function PersonalInfoStep({ formData, setFormData }) {
  const update = (field) => (eOrValue) => {
    const value = typeof eOrValue === 'string' ? eOrValue : eOrValue.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFilled = (field) => (formData[field] ? formData[field].length > 1 : undefined);

  return (
    <Box>
      {/* En-tête de l'étape */}
      <Box sx={{ position: 'relative', pl: 3, mb: 3 }}>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 4,
            bottom: 4,
            width: 2,
            bgcolor: 'primary.main',
            borderLeft: '2px dashed',
            borderColor: 'primary.main',
          }}
        />
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: 'primary.main', textDecoration: 'underline', mb: 1.5 }}
        >
          Informations personnelles
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
          Constitue la première étape de votre dépôt de dossier à l'IFPA. Nous vous invitons à
          fournir vos détails essentiels. Ces informations nous permettent de vous identifier et
          de vous contacter facilement pour toute communication importante concernant votre
          dossier. Veuillez remplir avec précision pour garantir un traitement sans délai.
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <Chip label="Note :" size="small" sx={{ bgcolor: '#d32f2f', color: '#fff', fontWeight: 700, height: 22 }} />
        </Stack>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Vos noms et prénoms devront être renseignés conformément à la structure de l'acte de
          naissance.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <ValidatedTextField
              label="Noms"
              required
              icon={PersonIcon}
              value={formData.nom || ''}
              onChange={update('nom')}
              isValid={isFilled('nom')}
              placeholder="Ex: DASSIE WENEGOH"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <ValidatedTextField
              label="Prénoms"
              required
              icon={PersonIcon}
              value={formData.prenom || ''}
              onChange={update('prenom')}
              isValid={isFilled('prenom')}
              placeholder="Ex: JUNIOR FRANCK"
            />
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Numéro de téléphone <Box component="span" sx={{ color: 'primary.main' }}>(*)</Box>
            </Typography>
            <PhoneInput
              international
              defaultCountry="CM"
              value={formData.telephone}
              onChange={(value) => setFormData((prev) => ({ ...prev, telephone: value }))}
              className="ifpa-phone-input"
            />
            {formData.telephone && (
              <Typography variant="caption" sx={{ color: '#2e7d32', display: 'block', mt: 0.5 }}>
                ✓ C'est bon !
              </Typography>
            )}
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Genre <Box component="span" sx={{ color: 'primary.main' }}>(*)</Box>
            </Typography>
            <FormControl>
              <RadioGroup
                row
                value={formData.genre || ''}
                onChange={update('genre')}
              >
                <FormControlLabel value="M" control={<Radio color="primary" />} label="Masculin" />
                <FormControlLabel value="F" control={<Radio color="primary" />} label="Féminin" />
              </RadioGroup>
            </FormControl>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <ValidatedTextField
              label="Date de naissance"
              required
              icon={CalendarMonthIcon}
              type="date"
              value={formData.dateNaissance || ''}
              onChange={update('dateNaissance')}
              isValid={isFilled('dateNaissance')}
              InputLabelProps={{ shrink: true }}
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ValidatedTextField
              label="Pays d'origine"
              required
              icon={PublicIcon}
              value={formData.paysOrigine || ''}
              onChange={update('paysOrigine')}
              isValid={isFilled('paysOrigine')}
              placeholder="Ex: Cameroun"
            />
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <ValidatedTextField
              label="Lieu de naissance"
              required
              icon={PlaceIcon}
              value={formData.lieuNaissance || ''}
              onChange={update('lieuNaissance')}
              isValid={isFilled('lieuNaissance')}
              placeholder="Ex: Douala"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <ValidatedTextField
              label="Ville de résidence"
              required
              icon={HomeIcon}
              value={formData.villeResidence || ''}
              onChange={update('villeResidence')}
              isValid={isFilled('villeResidence')}
              placeholder="Ex: Douala"
            />
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PersonalInfoStep;