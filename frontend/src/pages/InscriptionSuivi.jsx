import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Alert, Chip, Stack, Snackbar, Paper, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { paiementService } from '../services/paiementService';
import PaymentMethodCard from '../components/inscription/form/PaymentMethodCard';
import WaitingConfirmationScreen from '../components/inscription/form/WaitingConfirmationScreen';
import SuccessScreen from '../components/inscription/form/SuccessScreen';
import usePolling from '../hooks/usePolling';
import { playNotificationSound } from '../utils/notificationSound';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';

const methods = [
  { key: 'orange_money', label: 'Orange Money', logo: '/assets/paiements/orange-money.png' },
  { key: 'mtn_momo', label: 'MTN Mobile Money', logo: '/assets/paiements/mtn-momo.png' },
  { key: 'carte_bancaire', label: 'Carte bancaire', logo: '/assets/paiements/carte-bancaire.png' },
  { key: 'paypal', label: 'PayPal', logo: '/assets/paiements/paypal.png' },
];

const statutLabels = {
  soumis: { label: "Dossier soumis — en attente d'étude", color: 'warning' },
  dossier_valide: { label: 'Dossier validé — paiement requis', color: 'info' },
  rejete: { label: 'Dossier rejeté', color: 'error' },
  paiement_recu: { label: 'Paiement reçu — dossier en cours de finalisation', color: 'success' },
  expire: { label: 'Délai de paiement expiré', color: 'default' },
  admis: { label: 'Admis', color: 'success' },
};

function InscriptionSuivi() {
  const { token } = useParams();
  const [dossier, setDossier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [waitingReference, setWaitingReference] = useState(null);
  const [initiating, setInitiating] = useState(false);
  const [changeAlert, setChangeAlert] = useState('');

  const previousStatutRef = useRef(null);
  const isFirstLoadRef = useRef(true);

  const fetchDossier = useCallback(async (isBackground = false) => {
    try {
      const data = await paiementService.getStatutDossier(token);

      if (!isFirstLoadRef.current && previousStatutRef.current && previousStatutRef.current !== data.statut) {
        playNotificationSound();
        setChangeAlert('Le statut de votre dossier a été mis à jour.');
      }
      previousStatutRef.current = data.statut;
      isFirstLoadRef.current = false;

      setDossier(data);
      setError('');
    } catch (err) {
      setError('Dossier introuvable. Vérifiez le lien reçu par email.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDossier(false);
  }, [fetchDossier]);

  usePolling(() => fetchDossier(true), 15000, true);

  const handlePayer = async () => {
    if (!selectedMethod) return;
    setInitiating(true);
    try {
      const result = await paiementService.initierPaiement(token, selectedMethod);
      setWaitingReference(result.reference_transaction);
    } catch (err) {
      setError("Impossible d'initier le paiement pour le moment.");
    } finally {
      setInitiating(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Container maxWidth="sm">
          <Alert severity="error">{error}</Alert>
        </Container>
      </Box>
    );
  }

  if (dossier.statut === 'paiement_recu' || dossier.dernier_paiement?.statut === 'confirme') {
    return <SuccessScreen reference={dossier.reference} tokenSuivi={token} isPaymentConfirmed />;
  }

  if (waitingReference) {
    return <WaitingConfirmationScreen referenceTransaction={waitingReference} onConfirmed={() => fetchDossier(false)} />;
  }

  const statutInfo = statutLabels[dossier.statut] || { label: dossier.statut, color: 'default' };

  // --- Calcul du montant de base et du total avec majoration éventuelle ---
  const fraisBase = Number(dossier.frais_formation || 10000);
  const totalFrais = dossier.ramettes_papier_payantes ? fraisBase + 7000 : fraisBase;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: { xs: 4, sm: 6, md: 8 } }}>
      <Container maxWidth="sm">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: 3,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper'
            }}
          >
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Suivi de votre dossier
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                Référence : <strong>{dossier.reference}</strong>
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Stack spacing={3}>
              <Box>
                <Chip 
                  label={statutInfo.label} 
                  color={statutInfo.color} 
                  sx={{ fontWeight: 600, fontSize: '0.85rem', py: 1 }} 
                />
              </Box>
              <Button
                href={`http://localhost:8000/api/v1/candidatures/suivi/${token}/fiche-pdf`}
                target="_blank"
                variant="outlined"
                startIcon={<DownloadIcon />}
                sx={{ mb: 3, fontWeight: 600 }}
              >
                Télécharger ma fiche d'inscription (PDF)
              </Button>

              {dossier.statut === 'rejete' && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  <strong>Motif :</strong> {dossier.motif_rejet}
                </Alert>
              )}

              {dossier.statut === 'expire' && (
                <Alert severity="warning" sx={{ borderRadius: 2 }}>
                  Le délai de paiement pour ce dossier est dépassé. Merci de contacter l'administration
                  ou de soumettre un nouveau dossier.
                </Alert>
              )}

              {dossier.statut === 'dossier_valide' && (
                <Box>
                  <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
                    Délai pour payer : jusqu'au{' '}
                    <strong>{new Date(dossier.date_limite_paiement).toLocaleString('fr-FR')}</strong>
                  </Alert>

                  {/* --- AFFICHAGE DES FRAIS AVEC DÉTAIL ET MAJORATION --- */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      mb: 3,
                      borderRadius: 2,
                      bgcolor: 'primary.light',
                      color: 'primary.main'
                    }}
                  >
                    <Typography sx={{ fontWeight: 700, textAlign: 'center', mb: 0.5 }}>
                      Frais de dossier : {fraisBase.toLocaleString('fr-FR')} FCFA
                    </Typography>
                    {dossier.ramettes_papier_payantes && (
                      <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', mb: 2 }}>
                        + 7 000 FCFA (ramettes de papier fournies par l'institut) ={' '}
                        <Box component="span" sx={{ fontWeight: 700, color: 'primary.main' }}>
                          {totalFrais.toLocaleString('fr-FR')} FCFA
                        </Box>
                      </Typography>
                    )}
                  </Paper>
                  {/* --- FIN MODIFICATION --- */}

                  <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Choisissez votre moyen de paiement</Typography>
                  <Stack spacing={1.5} sx={{ mb: 3 }}>
                    {methods.map((method) => (
                      <PaymentMethodCard
                        key={method.key}
                        label={method.label}
                        logo={method.logo}
                        isSelected={selectedMethod === method.key}
                        onSelect={() => setSelectedMethod(method.key)}
                      />
                    ))}
                  </Stack>

                  <Box
                    component="button"
                    onClick={handlePayer}
                    disabled={!selectedMethod || initiating}
                    sx={{
                      width: '100%',
                      py: 1.8,
                      bgcolor: selectedMethod ? 'primary.main' : '#e0e0e0',
                      color: selectedMethod ? '#fff' : '#999',
                      border: 'none',
                      borderRadius: 2,
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: selectedMethod && !initiating ? 'pointer' : 'not-allowed',
                      opacity: selectedMethod ? 1 : 0.6,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        bgcolor: selectedMethod && !initiating ? 'primary.dark' : '#e0e0e0',
                        transform: selectedMethod && !initiating ? 'translateY(-2px)' : 'none',
                        boxShadow: selectedMethod && !initiating ? 3 : 'none'
                      }
                    }}
                  >
                    {initiating ? 'Initialisation...' : 'Procéder au paiement'}
                  </Box>
                </Box>
              )}

              {dossier.statut === 'soumis' && (
                <Alert severity="info" sx={{ borderRadius: 2 }}>
                  Votre dossier est en cours d'étude par notre équipe. Vous recevrez une notification
                  dès qu'une décision sera prise.
                </Alert>
              )}
            </Stack>
          </Paper>
        </motion.div>
      </Container>

      <Snackbar
        open={!!changeAlert}
        autoHideDuration={6000}
        onClose={() => setChangeAlert('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="info" onClose={() => setChangeAlert('')} sx={{ fontWeight: 600, borderRadius: 2 }}>
          {changeAlert}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default InscriptionSuivi;