import { Box } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// Extrait l'ID YouTube depuis différents formats d'URL possibles
function getYoutubeEmbedUrl(url) {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

function getVimeoEmbedUrl(url) {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? `https://player.vimeo.com/video/${match[1]}` : null;
}

function VideoPlayer({ item }) {
  // Détermine l'URL embed ou le fichier
  let embedUrl = null;
  let isIframe = false;
  let videoSrc = null;

  if (item.source_video === 'youtube') {
    embedUrl = getYoutubeEmbedUrl(item.fichier);
    isIframe = true;
  } else if (item.source_video === 'vimeo') {
    embedUrl = getVimeoEmbedUrl(item.fichier);
    isIframe = true;
  } else {
    videoSrc = item.fichier; // MP4 local
  }

  // Si aucune URL valide, on affiche un message
  if ((isIframe && !embedUrl) || (!isIframe && !videoSrc)) {
    return (
      <Box
        sx={{
          aspectRatio: '16/9',
          bgcolor: '#1a1a1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          color: 'white',
        }}
      >
        Vidéo indisponible
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        aspectRatio: '16/9',
        bgcolor: '#000',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        '&:hover .play-overlay': {
          opacity: 1,
        },
      }}
    >
      {/* Contenu vidéo */}
      {isIframe ? (
        <Box
          component="iframe"
          src={embedUrl}
          title={item.titre || 'Vidéo IFPA'}
          allowFullScreen
          sx={{
            width: '100%',
            height: '100%',
            border: 0,
            display: 'block',
          }}
        />
      ) : (
        <Box
          component="video"
          src={videoSrc}
          controls
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      )}

      {/* Overlay avec le bouton play (décoratif) */}
      <Box
        className="play-overlay"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none', // laisse passer les clics vers le lecteur
          opacity: 0.8,
          transition: 'opacity 0.3s',
          background: 'radial-gradient(circle, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 100%)',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            bgcolor: 'rgba(255,255,255,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 50, color: '#1976d2', ml: 1 }} />
        </Box>
      </Box>
    </Box>
  );
}

export default VideoPlayer;