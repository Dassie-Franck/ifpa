import { Box, Typography, Grid, Stack } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion } from 'framer-motion';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import ValidatedTextField from './ValidatedTextField';

function AdditionalInfoStep({ formData, setFormData }) {
  const update = (field) => (eOrValue) => {
    const value = typeof eOrValue === 'string' ? eOrValue : eOrValue.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFilled = (field) => (formData[field] ? formData[field].length > 1 : undefined);
  const isValidEmail = formData.email
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    : undefined;

  return (
    <Box>
      <Box sx={{ position: 'relative', pl: 3, mb: 3 }}>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 4,
            bottom: 4,
            width: 2,
            borderLeft: '2px dashed',
            borderColor: 'primary.main',
          }}
        />
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: 'primary.main', textDecoration: 'underline', mb: 1.5 }}
        >
          Informations complémentaires
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Ces informations concernent votre parcours scolaire et vos contacts d'urgence.
          Elles nous permettent d'évaluer l'éligibilité de votre dossier et de joindre un
          proche en cas de besoin.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <ValidatedTextField
              label="Dernier établissement fréquenté"
              required
              icon={SchoolIcon}
              value={formData.etablissement || ''}
              onChange={update('etablissement')}
              isValid={isFilled('etablissement')}
              placeholder="Ex: Lycée de Douala"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <ValidatedTextField
              label="Niveau d'études / Diplôme obtenu"
              required
              icon={WorkspacePremiumIcon}
              value={formData.niveauEtudes || ''}
              onChange={update('niveauEtudes')}
              isValid={isFilled('niveauEtudes')}
              placeholder="Ex: BAC série D"
            />
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
            <ValidatedTextField
              label="Adresse email"
              required
              icon={EmailIcon}
              type="email"
              value={formData.email || ''}
              onChange={update('email')}
              isValid={isValidEmail}
              errorMessage="Adresse email invalide"
              placeholder="exemple@email.com"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <ValidatedTextField
              label="Adresse de résidence complète"
              required
              icon={SchoolIcon}
              value={formData.adresse || ''}
              onChange={update('adresse')}
              isValid={isFilled('adresse')}
              placeholder="Quartier, rue, ville"
            />
          </motion.div>
        </Grid>

        {/* Séparateur - contact parent/tuteur (§6.4) */}
        <Grid item xs={12}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mt: 1, mb: 0.5 }}>
              Contact d'un parent ou tuteur
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              Requis pour toute communication en cas d'urgence
            </Typography>
          </motion.div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ValidatedTextField
              label="Nom complet du parent/tuteur"
              required
              icon={PersonIcon}
              value={formData.nomParent || ''}
              onChange={update('nomParent')}
              isValid={isFilled('nomParent')}
              placeholder="Ex: MBALLA Pierre"
            />
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
              Téléphone du parent/tuteur <Box component="span" sx={{ color: 'primary.main' }}>(*)</Box>
            </Typography>
            <PhoneInput
              international
              defaultCountry="CM"
              value={formData.telephoneParent}
              onChange={(value) => setFormData((prev) => ({ ...prev, telephoneParent: value }))}
              className="ifpa-phone-input"
            />
            {formData.telephoneParent && (
              <Typography variant="caption" sx={{ color: '#2e7d32', display: 'block', mt: 0.5 }}>
                ✓ C'est bon !
              </Typography>
            )}
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdditionalInfoStep;