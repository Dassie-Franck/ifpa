import { Box, Container, Grid, Typography, Stack, Button, CircularProgress } from '@mui/material';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Link as RouterLink } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { contentService } from '../../services/contentService';

// Couleur du bloc bordeaux sous l'image
const BORDEAUX = '#7a1128';

// 4 points forts - Modifiés pour refléter les événements et la vie étudiante
const features = [
  {
    icon: CelebrationIcon,
    text: "Des journées portes ouvertes animées où vous découvrirez nos formations dans une ambiance festive et conviviale",
  },
  {
    icon: EmojiEventsIcon,
    text: "Des cérémonies de remise des diplômes mémorables, célébrant la réussite et l'excellence de nos étudiants",
  },
  {
    icon: GroupsIcon,
    text: "Des événements culturels et sportifs tout au long de l'année pour créer des liens et partager des moments inoubliables",
  },
  {
    icon: MusicNoteIcon,
    text: "Des soirées étudiantes, concerts et activités festives qui rythment la vie du campus et renforcent l'esprit de communauté",
  },
];

function OurCampuses() {
  // Récupération des actualités pour les images et les textes
  const { data: articles, loading } = useFetch(() => contentService.getActualites(), []);

  // Récupération des événements
  const { data: events } = useFetch(() => contentService.getEvenements(), []);

  // On prend les 4 plus récentes pour la mosaïque
  const latestFour = articles?.slice(0, 4) || [];

  // On prend les 2 premiers événements pour les blocs du bas
  const latestTwoEvents = events?.slice(0, 2) || [];

  // Construction des données pour la mosaïque 2x2 à partir des actualités
  const mosaicItems = [
    {
      // Cellule 1 : texte (haut-gauche) - 1ère actualité
      type: 'text',
      title: latestFour[1]?.titre?.toUpperCase() ||'JOURNÉE PORTES OUVERTES',
      description: latestFour[1]?.extrait|| 'Découvrez nos formations et nos campus lors de nos journées portes ouvertes',
      link: `/actualites/${latestFour[1]?.slug || '#'}`,
      color: 'primary.main',
    },
    {
      // Cellule 2 : image (haut-droite) - 2ème actualité
      type: 'image',
      image: latestFour[1]?.image_couverture || '/assets/campus/campus1.jpg',
    },
    {
      // Cellule 3 : image (bas-gauche) - 3ème actualité
      type: 'image',
      image: latestFour[2]?.image_couverture || '/assets/campus/campus2.jpg',
    },
    {
      // Cellule 4 : texte (bas-droite) - 4ème actualité
      type: 'text',
      title: latestFour[2]?.titre?.toUpperCase() || 'RENTRÉE SCOLAIRE',
      description: latestFour[2]?.extrait|| 'Préparez votre rentrée et inscrivez-vous dès maintenant',
      link: `/actualites/${latestFour[2]?.slug || '#'}`,
      color: 'primary.dark',
    },
  ];

  // Construction des événements pour les blocs du bas
  // Si 2 événements existent, on les utilise, sinon on prend les 2 premiers de la liste
  const eventItems = latestTwoEvents.length === 2 
    ? latestTwoEvents.map((event) => ({
        name: event.description?.toUpperCase() || 'ÉVÉNEMENTs',
        description: event.resume || event.description || 'Découvrez cet événement organisé par l\'IFPA',
        image: event.image_couverture || '/assets/campus/campus1.jpg',
        link: `/evenements/${event.slug || '#'}`,
        color: BORDEAUX,
      }))
    : [
        {
          name: latestFour[0]?.titre?.toUpperCase() || 'Remise des Diplomes  ',
          description: latestFour[0]?.extrait || 'Des grandes Ceremonie organiser par l\'ecole pour faire honneur a nos valeur diplome qui son pret a vivre les aventure du monde professionelle',
          image: latestFour[0]?.image_couverture || '/assets/campus/campus1.jpg',
          link: `/actualites/${latestFour[0]?.slug || '#'}`,
          color: BORDEAUX,
        },
        {
          name: latestFour[3]?.titre?.toUpperCase() || 'INFRASTRUCTURES',
          description: latestFour[3]?.extrait || 'Des infrastructures modernes et sécurisées au service de la réussite',
          image: latestFour[3]?.image_couverture || '/assets/campus/campus1.jpg',
          link: `/actualites/${latestFour[3]?.slug || '#'}`,
          color: BORDEAUX,
        },
      ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'flex-start',
            gap: 5,
          }}
        >
          {/* Colonne gauche : titre + 4 points */}
          <Box sx={{ width: { xs: '100%', md: '41.6667%' }, flexShrink: 0 }}>
            <Typography
              variant="overline"
              display="block"
              sx={{ color: 'text.secondary', letterSpacing: 2, mb: 1 }}
            >
              Les Derniers Actualites Sur le Campus !
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, color: 'warning.main', mb: 3, lineHeight: 1.3 }}
            >
              Des espaces propices à l'apprentissage et à l'épanouissement
            </Typography>
 
            <Stack spacing={3}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Stack direction="row" spacing={2} alignItems="flex-start" key={index}>
                    <Box
                      sx={{
                        bgcolor: '#7a1f1f',
                        color: '#fff',
                        borderRadius: '50%',
                        width: 44,
                        height: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon sx={{ fontSize: 22 }} />
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.primary', pt: 0.7 }}>
                      {feature.text}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>

          {/* Colonne droite : mosaïque 2x2 en diagonale (texte/image/image/texte) */}
          <Box sx={{ width: { xs: '100%', md: '58.3333%' }, flexShrink: 0 }}>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: '300px 300px',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              {/* Cellule 1 : texte (haut-gauche) */}
              {mosaicItems[0].type === 'text' && (
                <Box
                  sx={{
                    bgcolor: mosaicItems[0].color,
                    color: '#fff',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    {mosaicItems[0].title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                    {mosaicItems[0].description}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={mosaicItems[0].link}
                    size="small"
                    variant="outlined"
                    sx={{ color: '#fff', borderColor: '#fff', alignSelf: 'flex-start' }}
                  >
                    En savoir +
                  </Button>
                </Box>
              )}

              {/* Cellule 2 : image (haut-droite) */}
              <Box
                sx={{
                  backgroundImage: `url(${mosaicItems[1].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Cellule 3 : image (bas-gauche) */}
              <Box
                sx={{
                  backgroundImage: `url(${mosaicItems[2].image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              {/* Cellule 4 : texte (bas-droite) */}
              {mosaicItems[3].type === 'text' && (
                <Box
                  sx={{
                    bgcolor: mosaicItems[3].color,
                    color: '#fff',
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                    {mosaicItems[3].title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
                    {mosaicItems[3].description}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={mosaicItems[3].link}
                    size="small"
                    variant="outlined"
                    sx={{ color: '#fff', borderColor: '#fff', alignSelf: 'flex-start' }}
                  >
                    En savoir +
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Événements - 2 blocs alignés sur la même ligne */}
        <Grid container spacing={2} sx={{ mt: 6 }}>
          {eventItems.map((event, index) => (
            <Grid item xs={12} sm={6} key={`event-${index}`}>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    flex: 1,
                    backgroundImage: `url(${event.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
                <Box sx={{ bgcolor: event.color, color: '#fff', p: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {event.name.toUpperCase()}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', opacity: 0.9, mb: 1.5 }}>
                    {event.description}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={event.link}
                    size="small"
                    variant="outlined"
                    sx={{ color: '#fff', borderColor: '#fff', fontSize: '0.7rem' }}
                  >
                    En savoir +
                  </Button>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default OurCampuses;