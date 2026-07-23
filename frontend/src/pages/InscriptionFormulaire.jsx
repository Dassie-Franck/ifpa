import { useState } from 'react';
import { Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import FormStepLayout from '../components/inscription/form/FormStepLayout';
import PersonalInfoStep from '../components/inscription/form/PersonalInfoStep';
import AdditionalInfoStep from '../components/inscription/form/AdditionalInfoStep';
import DocumentsStep from '../components/inscription/form/DocumentsStep';
import PaymentStep from '../components/inscription/form/PaymentStep';
import SuccessScreen from '../components/inscription/form/SuccessScreen';

const steps = [
  'Informations personnelles',
  'Informations complémentaires',
  'Filière & pièces justificatives',
  'Paiement',
];

function InscriptionFormulaire() {
  const [searchParams] = useSearchParams();
  const centre = searchParams.get('centre') || 'Non renseigné';

  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');

  const requiredFieldsStep0 = ['nom', 'prenom', 'telephone', 'genre', 'dateNaissance', 'paysOrigine', 'lieuNaissance', 'villeResidence'];
  const requiredFieldsStep1 = ['etablissement', 'niveauEtudes', 'email', 'adresse', 'nomParent', 'telephoneParent'];
  const isStep0Complete = requiredFieldsStep0.every((f) => formData[f]);
  const isStep1Complete = requiredFieldsStep1.every((f) => formData[f]);
  const isStep2Complete =
    formData.filiere && formData.photoIdentite && formData.acteNaissance &&
    formData.diplome && formData.certificatMedical;
  const isStep3Complete = !!formData.moyenPaiement;

  const isNextDisabled =
    (activeStep === 0 && !isStep0Complete) ||
    (activeStep === 1 && !isStep1Complete) ||
    (activeStep === 2 && !isStep2Complete) ||
    (activeStep === 3 && !isStep3Complete);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // TODO: appel API Laravel POST /api/v1/candidatures + /api/v1/paiements/initier
      const generatedRef = 'IFPA-' + Math.random().toString(36).substring(2, 10).toUpperCase();
      setReference(generatedRef);
      setSubmitted(true);
      return;
    }
    setDirection(1);
    setActiveStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  if (submitted) {
    return <SuccessScreen reference={reference} />;
  }

  return (
    <FormStepLayout
      centreLabel={centre}
      steps={steps}
      activeStep={activeStep}
      direction={direction}
      onPrevious={handlePrevious}
      onNext={handleNext}
      isNextDisabled={isNextDisabled}
    >
      {activeStep === 0 && <PersonalInfoStep formData={formData} setFormData={setFormData} />}
      {activeStep === 1 && <AdditionalInfoStep formData={formData} setFormData={setFormData} />}
      {activeStep === 2 && <DocumentsStep formData={formData} setFormData={setFormData} />}
      {activeStep === 3 && <PaymentStep formData={formData} setFormData={setFormData} />}
    </FormStepLayout>
  );
}

export default InscriptionFormulaire;