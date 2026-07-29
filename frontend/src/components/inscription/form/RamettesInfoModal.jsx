import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function RamettesInfoModal({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <InfoIcon sx={{ color: 'primary.main' }} />
        Information sur les frais
      </DialogTitle>
      <DialogContent>
        <Typography sx={{ color: 'text.secondary', mb: 2 }}>
          En cochant cette option, un montant de{' '}
          <Box component="strong" sx={{ color: 'text.primary' }}>7 000 FCFA</Box> sera ajouté au
          montant de vos frais de dossier pour couvrir l'achat de 2 ramettes de papier A4 80g,
          que l'institut se chargera de fournir.
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          Si vous ne cochez pas cette option, vous devrez vous présenter à l'institut avec vos 2
          ramettes de papier A4 80g le jour du dépôt physique de votre dossier.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} color="inherit">
          Annuler
        </Button>
        <Button onClick={onConfirm} variant="contained" sx={{ fontWeight: 700 }}>
          J'ai compris, activer l'option
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RamettesInfoModal;