import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function PageBanner({ image, breadcrumbLabel }) {
  return (
    <>
      <Box
        sx={{
          height: { xs: 220, md: 340 },
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Breadcrumbs separator="»" sx={{ fontSize: '0.85rem' }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            Accueil
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>
            {breadcrumbLabel}
          </Typography>
        </Breadcrumbs>
      </Container>
    </>
  );
}

export default PageBanner;