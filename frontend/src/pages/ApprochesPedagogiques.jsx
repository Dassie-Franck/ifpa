import { Box } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import PedagogicalApproach from '../components/institut/PedagogicalApproach';

function ApprochesPedagogiques() {
  return (
    <Box>
      <PageBanner image="/assets/banners/banner-site.jpg" breadcrumbLabel="Nos approches pédagogiques" />
      <PedagogicalApproach />
    </Box>
  );
}

export default ApprochesPedagogiques;