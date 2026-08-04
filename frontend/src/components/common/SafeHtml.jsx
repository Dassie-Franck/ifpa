import DOMPurify from 'dompurify';
import { Box } from '@mui/material';

// Affiche du HTML provenant de l'API (ex: contenu RichEditor Filament) en le
// nettoyant au préalable — empêche l'exécution de scripts malveillants même si
// un compte back-office venait à être compromis et injectait du contenu piégé.
function SafeHtml({ html, sx }) {
  const cleanHtml = DOMPurify.sanitize(html || '', {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'a', 'blockquote'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
  });

  return (
    <Box
      sx={{ '& p': { mb: 2 }, '& a': { color: 'primary.main' }, ...sx }}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}

export default SafeHtml;