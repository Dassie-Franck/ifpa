import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function WhatsAppButton() {
  return (
    <Fab
      color="success"
      aria-label="Contacter sur WhatsApp"
      href="https://wa.me/000000000000"
      target="_blank"
      rel="noopener noreferrer"
      sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}
    >
      <WhatsAppIcon />
    </Fab>
  );
}

export default WhatsAppButton;