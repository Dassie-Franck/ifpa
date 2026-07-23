import { TextField, InputAdornment, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { motion, AnimatePresence } from 'framer-motion';

// Champ texte avec icône, message de validation en temps réel (succès/erreur),
// utilisé pour tous les champs du formulaire d'inscription (§6.5).
function ValidatedTextField({
  label,
  required,
  icon: Icon,
  value,
  onChange,
  isValid,
  errorMessage = 'Ce champ est invalide',
  successMessage = "C'est bon !",
  type = 'text',
  ...props
}) {
  const touched = value !== '' && value !== undefined;

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
        {label} {required && <Box component="span" sx={{ color: 'primary.main' }}>(*)</Box>}
      </Typography>
      <TextField
        fullWidth
        type={type}
        value={value}
        onChange={onChange}
        variant="outlined"
        size="small"
        error={touched && isValid === false}
        InputProps={{
          startAdornment: Icon && (
            <InputAdornment position="start">
              <Icon sx={{ fontSize: 20, color: 'text.secondary' }} />
            </InputAdornment>
          ),
        }}
        sx={{
          bgcolor: touched && isValid ? '#eef3fb' : '#fff',
          '& .MuiOutlinedInput-root': {
            borderColor: touched && isValid ? 'secondary.main' : undefined,
          },
        }}
        {...props}
      />
      <AnimatePresence>
        {touched && isValid !== undefined && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              {isValid ? (
                <>
                  <CheckCircleIcon sx={{ fontSize: 14, color: '#2e7d32' }} />
                  <Typography variant="caption" sx={{ color: '#2e7d32' }}>
                    {successMessage}
                  </Typography>
                </>
              ) : (
                <>
                  <ErrorIcon sx={{ fontSize: 14, color: '#d32f2f' }} />
                  <Typography variant="caption" sx={{ color: '#d32f2f' }}>
                    {errorMessage}
                  </Typography>
                </>
              )}
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default ValidatedTextField;