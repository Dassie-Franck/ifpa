import { Box } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import GalleryGrid from '../components/galerie/GalleryGrid';

function PresentationSite() {
  return (
    <Box>
      <PageBanner image="/assets/banners/vie-campus.jpg" breadcrumbLabel="Présentation du site" />
      <GalleryGrid />
    </Box>
  );
}

export default PresentationSite;