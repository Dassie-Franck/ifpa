import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function AdmissionBanner() {
  return (
    <Box sx={{ bgcolor: 'secondary.main', py: 2.5 }}>
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography
            variant="h6"
            sx={{ color: '#fff', fontWeight: 800, textAlign: { xs: 'center', sm: 'left' } }}
          >
            Concours d'admission 2026-2027
          </Typography>
          <Button
            component={RouterLink}
            to="/admission"
            variant="contained"
            sx={{
              bgcolor: '#fff',
              color: 'secondary.main',
              fontWeight: 700,
              px: 3,
              '&:hover': { bgcolor: '#f0f0f0' },
            }}
          >
            En savoir +
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default AdmissionBanner;