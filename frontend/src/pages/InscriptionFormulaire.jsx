import { useState } from 'react';
import { Typography, Alert } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import FormStepLayout from '../components/inscription/form/FormStepLayout';
import PersonalInfoStep from '../components/inscription/form/PersonalInfoStep';
import AdditionalInfoStep from '../components/inscription/form/AdditionalInfoStep';
import DocumentsStep from '../components/inscription/form/DocumentsStep';
import SubmittingScreen from '../components/inscription/form/SubmittingScreen';
import SuccessScreen from '../components/inscription/form/SuccessScreen';
import { candidatureService } from '../services/candidatureService';

// Le paiement n'est plus une étape de ce formulaire : il n'intervient qu'après
// validation du dossier par l'équipe admissions (voir le nouveau workflow).
const steps = [
  'Informations personnelles',
  'Informations complémentaires',
  'Filière & pièces justificatives',
];

function InscriptionFormulaire() {
  const [searchParams] = useSearchParams();
  const centre = searchParams.get('centre') || 'Non renseigné';

  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('form'); // form | submitting | success | error
  const [result, setResult] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const requiredFieldsStep0 = ['nom', 'prenom', 'telephone', 'genre', 'dateNaissance', 'paysOrigine', 'lieuNaissance', 'villeResidence'];
  const requiredFieldsStep1 = ['etablissement', 'niveauEtudes', 'email', 'adresse', 'nomParent', 'telephoneParent'];
  const isStep0Complete = requiredFieldsStep0.every((f) => formData[f]);
  const isStep1Complete = requiredFieldsStep1.every((f) => formData[f]);
  const isStep2Complete =
    formData.filiereId && formData.photoIdentite && formData.acteNaissance &&
    formData.diplome && formData.certificatMedical;

  const isNextDisabled =
    (activeStep === 0 && !isStep0Complete) ||
    (activeStep === 1 && !isStep1Complete) ||
    (activeStep === 2 && !isStep2Complete);

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
      setStatus('submitting');
      setSubmitError('');
      try {
        const response = await candidatureService.submit(formData);
        setResult(response.candidature);
        setStatus('success');
      } catch (error) {
        const message =
          error.response?.data?.message ||
          "Une erreur est survenue lors de l'envoi de votre dossier. Veuillez réessayer.";
        setSubmitError(message);
        setStatus('error');
      }
      return;
    }
    setDirection(1);
    setActiveStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  if (status === 'submitting') return <SubmittingScreen />;
  if (status === 'success') return <SuccessScreen reference={result.reference} tokenSuivi={result.token_suivi} />;

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
      {status === 'error' && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {submitError}
        </Alert>
      )}
      {activeStep === 0 && <PersonalInfoStep formData={formData} setFormData={setFormData} />}
      {activeStep === 1 && <AdditionalInfoStep formData={formData} setFormData={setFormData} />}
      {activeStep === 2 && <DocumentsStep formData={formData} setFormData={setFormData} />}
    </FormStepLayout>
  );
}

export default InscriptionFormulaire;