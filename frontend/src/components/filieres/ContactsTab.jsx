import { Box, Typography, Stack } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { motion } from 'framer-motion';

function ContactsTab() {
  return (
    <Box>
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <Box sx={{ bgcolor: '#f0f0f0', px: 3, py: 2, mb: 3 }}>
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 800 }}>
            Contacts
          </Typography>
        </Box>
      </motion.div>

      <Stack spacing={2}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <PhoneIcon sx={{ color: 'primary.main' }} />
          <Typography>+237 6XX XXX XXX</Typography>
        </Stack>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <EmailIcon sx={{ color: 'primary.main' }} />
          <Typography>[email protected]</Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default ContactsTab;