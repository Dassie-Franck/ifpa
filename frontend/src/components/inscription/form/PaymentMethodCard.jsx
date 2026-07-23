import { Box, Typography, Stack } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion } from 'framer-motion';

function PaymentMethodCard({ label, logo, isSelected, onSelect, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Box
        onClick={onSelect}
        sx={{
          border: '2px solid',
          borderColor: isSelected ? 'primary.main' : '#eee',
          bgcolor: isSelected ? '#fff5ec' : '#fff',
          borderRadius: 1,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box component="img" src={logo} alt={label} sx={{ height: 28 }} />
          <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
        </Stack>
        {isSelected && <CheckCircleIcon sx={{ color: 'primary.main' }} />}
      </Box>
    </motion.div>
  );
}

export default PaymentMethodCard;