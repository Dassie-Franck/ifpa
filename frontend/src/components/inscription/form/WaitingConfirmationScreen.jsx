import { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import api from '../../../services/api';

// Sonde le backend toutes les 4 secondes pour savoir si le paiement a été confirmé
// côté serveur (jamais de confirmation supposée depuis le frontend).
function WaitingConfirmationScreen({ referenceTransaction, onConfirmed }) {
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 45; // ~3 minutes

  useEffect(() => {
    if (attempts >= MAX_ATTEMPTS) return;

    const interval = setInterval(async () => {
      try {
        const result = await api.get(`/paiements/verifier/${referenceTransaction}`);
        if (result.data.statut === 'confirme') {
          onConfirmed();
        }
      } catch (err) {
        // Silencieux — on continue à sonder
      }
      setAttempts((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [attempts, referenceTransaction, onConfirmed]);

  return (
    <Container maxWidth="sm" sx={{ py: 10, textAlign: 'center' }}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <CircularProgress color="primary" sx={{ mb: 3 }} />
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
          En attente de confirmation du paiement
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 2 }}>
          Complétez le paiement sur votre téléphone ou sur la page du fournisseur. Cette page se
          mettra à jour automatiquement dès réception de la confirmation.
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          Référence transaction : {referenceTransaction}
        </Typography>

        {attempts >= MAX_ATTEMPTS && (
          <Alert severity="warning" sx={{ mt: 3 }}>
            La confirmation prend plus de temps que prévu. Rechargez cette page dans quelques
            minutes, ou contactez l'administration si le problème persiste.
          </Alert>
        )}
      </motion.div>
    </Container>
  );
}

export default WaitingConfirmationScreen;