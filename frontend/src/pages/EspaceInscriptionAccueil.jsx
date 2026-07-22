import { Box } from '@mui/material';
import InscriptionHero from '../components/inscription/InscriptionHero';
import PrerequisBlock from '../components/inscription/PrerequisBlock';
import OurCenters from '../components/inscription/OurCenters';
import FilieresAccordionGrid from '../components/inscription/FilieresAccordionGrid';
import RequiredDocuments from '../components/inscription/RequiredDocuments';
import ProcessSteps from '../components/inscription/ProcessSteps';
import InstructionsComplement from '../components/inscription/InstructionsComplement';
function EspaceInscriptionAccueil() {
  return (
    <Box>
      <InscriptionHero />
      <PrerequisBlock />
      <OurCenters />
      <FilieresAccordionGrid />
      <RequiredDocuments/>
         <ProcessSteps />
      <InstructionsComplement />
    </Box>
  );
}

export default EspaceInscriptionAccueil;