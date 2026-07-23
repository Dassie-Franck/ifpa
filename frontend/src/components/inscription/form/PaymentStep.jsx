import { Box, Typography, Grid, Stack, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import PaymentMethodCard from './PaymentMethodCard';

// Frais de dossier — montant provisoire, à valider avec la direction de l'IFPA
const FRAIS_DOSSIER = 10000;

const methods = [
  { key: 'orange_money', label: 'Orange Money', logo: '/assets/paiements/orange-money.png' },
  { key: 'mtn_momo', label: 'MTN Mobile Money', logo: '/assets/paiements/mtn-momo.png' },
  { key: 'carte_bancaire', label: 'Carte bancaire (Visa / Mastercard)', logo: '/assets/paiements/carte-bancaire.png' },
  { key: 'paypal', label: 'PayPal', logo: '/assets/paiements/paypal.png' },
];

function PaymentStep({ formData, setFormData }) {
  return (
    <Box>
      <Box sx={{ position: 'relative', pl: 3, mb: 3 }}>
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 4,
            bottom: 4,
            width: 2,
            borderLeft: '2px dashed',
            borderColor: 'primary.main',
          }}
        />
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, color: 'primary.main', textDecoration: 'underline', mb: 1.5 }}
        >
          Paiement
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Dernière étape : réglez les frais de dossier pour finaliser le dépôt de votre
          candidature. Après paiement, vous recevrez un identifiant de suivi par SMS et par email.
        </Typography>
      </Box>

      {/* Récapitulatif */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ bgcolor: '#f7f7f7', p: 2.5, borderRadius: 1, mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Candidat</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formData.nom} {formData.prenom}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Filière choisie</Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {formData.filiere || '—'}
            </Typography>
          </Stack>
          <Divider sx={{ my: 1.5 }} />
          <Stack direction="row" justifyContent="space-between">
            <Typography sx={{ fontWeight: 700 }}>Frais de dossier</Typography>
            <Typography sx={{ fontWeight: 800, color: 'primary.main' }}>
              {FRAIS_DOSSIER.toLocaleString('fr-FR')} FCFA
            </Typography>
          </Stack>
        </Box>
      </motion.div>

      {/* Choix du moyen de paiement */}
      <Typography sx={{ fontWeight: 700, mb: 1.5 }}>Choisissez votre moyen de paiement</Typography>
      <Grid container spacing={1.5}>
        {methods.map((method, index) => (
          <Grid item xs={12} sm={6} key={method.key}>
            <PaymentMethodCard
              label={method.label}
              logo={method.logo}
              isSelected={formData.moyenPaiement === method.key}
              onSelect={() => setFormData((prev) => ({ ...prev, moyenPaiement: method.key }))}
              delay={index * 0.08}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default PaymentStep;