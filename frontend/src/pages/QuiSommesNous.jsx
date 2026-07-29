import { Box } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import AboutIntro from '../components/institut/AboutIntro';
import OurValues from '../components/institut/OurValues';
import MissionAmbition from '../components/institut/MissionAmbition';
import EngagementBlocks from '../components/institut/EngagementBlocks';
import OurSpecificities from '../components/institut/OurSpecificities';

function QuiSommesNous() {
  return (
    <Box>
      <PageBanner image="/assets/banners/admission-banners.jpg" breadcrumbLabel="Qui sommes-nous" />
      <AboutIntro />
      <OurValues />
      <MissionAmbition />
      <EngagementBlocks />
      <OurSpecificities />
    </Box>
  );
}

export default QuiSommesNous;