import { Box, TextField, Typography } from '@mui/material';

// Champ de formulaire avec icône encadrée + retour visuel de validation (§6.5)
// Fond lavande + bordure verte quand rempli, message "C'est bon !" en dessous.
function ValidatedTextField({
  label,
  required,
  icon: Icon,
  value,
  onChange,
  isValid,
  placeholder,
  type,
  InputLabelProps,
  ...rest
}) {
  const borderColor = isValid ? '#2e7d32' : '#ccc';

  return (
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
        {label}{' '}
        {required && (
          <Box component="span" sx={{ color: 'primary.main' }}>
            (*)
          </Box>
        )}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'stretch' }}>
        {/* Bloc icône */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            flexShrink: 0,
            bgcolor: '#f2f2f2',
            border: '1px solid',
            borderColor,
            borderRight: 'none',
            borderRadius: '4px 0 0 4px',
            color: 'text.secondary',
          }}
        >
          {Icon && <Icon fontSize="small" />}
        </Box>

        {/* Champ de saisie */}
        <TextField
          fullWidth
          size="small"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          InputLabelProps={InputLabelProps}
          {...rest}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '0 4px 4px 0',
              bgcolor: isValid ? '#e8eaf6' : '#fff',
              '& fieldset': { borderColor },
              '&:hover fieldset': { borderColor },
              '&.Mui-focused fieldset': { borderColor },
            },
            '& .MuiOutlinedInput-input': { py: 1.2 },
          }}
        />
      </Box>

      {isValid && (
        <Typography
          variant="caption"
          sx={{ color: '#2e7d32', display: 'block', mt: 0.5 }}
        >
          ✓ C'est bon !
        </Typography>
      )}
    </Box>
  );
}

export default ValidatedTextField;
