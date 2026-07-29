import { Fab } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function WhatsAppButton() {
  const message = "Bonjour, je souhaite obtenir plus d'informations sur votre école.";
  const url = `https://wa.me/237696957771?text=${encodeURIComponent(message)}`;

  return (
    <Fab
      color="success"
      aria-label="Contacter sur WhatsApp"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1300 }}
    >
      <WhatsAppIcon />
    </Fab>
  );
}

export default WhatsAppButton;