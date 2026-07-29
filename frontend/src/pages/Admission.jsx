import { Box } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import AdmissionStepsNav from '../components/admission/AdmissionStepsNav';
import AdmissionIntro from '../components/admission/AdmissionIntro';
import PaymentTerms from '../components/admission/PaymentTerms';
import AdmissionProcess from '../components/admission/AdmissionProcess';
import AdmissionFaq from '../components/admission/AdmissionFaq';
import FicheInscriptionDownloads from '../components/admission/FicheInscriptionDownloads';
function Admission() {
  return (
    <Box>
      <PageBanner image="/assets/banners/admission-banners.jpg" breadcrumbLabel="Admission" />
      <AdmissionStepsNav />
      <AdmissionIntro />
      <AdmissionIntro />
<FicheInscriptionDownloads />
<PaymentTerms />
      <PaymentTerms />
       <AdmissionProcess />
        <AdmissionFaq />
      {/* Les sections suivantes (Admissions aux concours, Modalités de paiement, Déroulement, FAQ) viendront ici */}
    </Box>
  );
}

export default Admission;