import { Box } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import PedagogicalApproach from '../components/institut/PedagogicalApproach';

function ApprochesPedagogiques() {
  return (
    <Box>
      <PageBanner image="/assets/banners/institut-banner.jpg" breadcrumbLabel="Nos approches pédagogiques" />
      <PedagogicalApproach />
    </Box>
  );
}

export default ApprochesPedagogiques;