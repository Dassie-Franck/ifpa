import { useState } from 'react';
import { Box, Container, Typography, Breadcrumbs, Link, Grid, Card, CardMedia, CardContent, List, ListItem, ListItemIcon, ListItemText, Divider, Paper } from '@mui/material';
import { Link as RouterLink, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FiliereTabs from '../components/filieres/FiliereTabs';
import CursusTab from '../components/filieres/CursusTab';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Filières paramédicales IFPA (§6.3 du cahier des charges)
const filieres = [
  { title: 'Delegue Medicale', image: '/assets/filieres/delegue-medical.jpg', link: '/formation/delegue-medicale' },
  { title: 'Vendeur en pharmacie', image: '/assets/filieres/vendeur-pharmacie.jpg', link: '/formation/vendeur-pharmacie' },
  { title: 'Auxiliaire de Vie', image: '/assets/filieres/Auxiliare-de-vie.jpg', link: '/formation/auxiliaire-de-vie' },
  { title: 'Assistant en Cabinet Medicale', image: '/assets/filieres/assistant-cabinet.jpg', link: '/formation/assistant-cabinet-medicale' },
  { title: 'Aide Chimiste Biologiste', image: '/assets/filieres/chimiste.jpg', link: '/formation/aide-chimiste-biologiste' },
];

// Données détaillées pour chaque filière
const filiereDetailsData = {
  'Delegue Medicale': {
    title: 'Délégué Médical',
    cursus: [
      "La formation de Délégué Médical, d'une durée de 2 ans, prépare des professionnels de la communication médicale capables de promouvoir les produits pharmaceutiques auprès des professionnels de santé.",
      "La formation alterne entre enseignements théoriques (anatomie, pharmacologie, techniques de vente, marketing pharmaceutique) et stages pratiques en laboratoires pharmaceutiques.",
      "L'étudiant en Délégué Médical de l'IFPA développe des compétences en communication scientifique, relation client, et stratégie commerciale dans le secteur de la santé.",
      "Les stages en entreprises partenaires permettent à l'étudiant de se confronter aux réalités du terrain et de développer son réseau professionnel.",
      "Un accompagnement personnalisé est assuré par des formateurs expérimentés issus de l'industrie pharmaceutique."
    ],
    programme: {
      title: "Le programme",
      description: "La formation de Délégué Médical à l'IFPA est portée par plusieurs domaines d'enseignement. Elle vise le développement de compétences essentielles pour un professionnel de la promotion médicale.",
      domains: [
        {
          name: "Sciences médicales et pharmacologie",
          percentage: "40%",
          items: ["Anatomie et physiologie humaine", "Pharmacologie et thérapeutique", "Pathologies et traitements", "Classification des médicaments"]
        },
        {
          name: "Communication et marketing",
          percentage: "35%",
          items: ["Techniques de vente et négociation", "Marketing pharmaceutique", "Communication scientifique", "Gestion de la relation client"]
        },
        {
          name: "Compétences managériales et transversales",
          percentage: "25%",
          items: ["Éthique et déontologie pharmaceutique", "Anglais médical", "Gestion de territoire", "Veille réglementaire"]
        }
      ]
    },
    debouches: [
      "Délégué Médical en laboratoire pharmaceutique",
      "Chargé de promotion médicale",
      "Responsable de secteur pharmaceutique",
      "Chef de produit pharmaceutique",
      "Formateur en laboratoire",
      "Responsable marketing pharmaceutique"
    ],
    scolarite: {
      title: "La Scolarité",
      couts: [
        { annee: "1ère année", montant: "1 800 000 FCFA" },
        { annee: "2ème année", montant: "1 800 000 FCFA" }
      ],
      message: "Votre choix d'études supérieures ne doit pas se faire à partir d'éléments financiers, mais à partir de vrais critères : qualité de la formation scientifique, technique et humaine, spécificités de l'école, correspondance avec votre projet personnel...",
      financement: "Pour les élèves brillants issus des milieux défavorisés, des dispositifs de financement ont été mis en place via le Fonds de solidarité."
    },
    campus: {
      title: "CAMPUS DOUALA",
      visits: [
        { name: "CAMPUS DOUALA", label: "VISITE GUIDÉE" },
        { name: "CAMPUS POINTE NOIRE", label: "VISITE GUIDÉE" }
      ]
    },
    contacts: {
      responsable: "Dr. Pierre KONAN",
      email: "delegue.medical@ifpa.ci",
      telephone: "+225 07 08 09 10 11",
      bureau: "Bâtiment A - Bureau 102"
    }
  },
  'Vendeur en pharmacie': {
    title: 'Vendeur en Pharmacie',
    cursus: [
      "La formation de Vendeur en Pharmacie, d'une durée de 1 an, prépare des professionnels capables d'accueillir et de conseiller la clientèle en officine.",
      "La formation combine des enseignements théoriques (pharmacologie, botanique, cosmétologie, nutrition) et des stages pratiques en pharmacie.",
      "L'étudiant en Vendeur en Pharmacie de l'IFPA acquiert des compétences en conseil client, gestion de stock, et vente de produits paramédicaux.",
      "Les stages en pharmacie permettent à l'étudiant de se familiariser avec l'environnement professionnel et les attentes des patients.",
      "La formation met l'accent sur la relation client et le conseil personnalisé dans le respect des règles déontologiques."
    ],
    programme: {
      title: "Le programme",
      description: "La formation de Vendeur en Pharmacie à l'IFPA est portée par plusieurs domaines d'enseignement. Elle vise le développement de compétences essentielles pour un professionnel de l'officine.",
      domains: [
        {
          name: "Sciences pharmaceutiques",
          percentage: "40%",
          items: ["Pharmacologie générale", "Botanique et pharmacognosie", "Cosmétologie et dermocosmétique", "Nutrition et diététique"]
        },
        {
          name: "Gestion et commerce",
          percentage: "35%",
          items: ["Gestion de stock et approvisionnement", "Techniques de vente et conseil", "Merchandising", "Gestion des commandes"]
        },
        {
          name: "Compétences relationnelles",
          percentage: "25%",
          items: ["Accueil et relation client", "Règlementation pharmaceutique", "Anglais professionnel", "Éthique déontologique"]
        }
      ]
    },
    debouches: [
      "Vendeur en pharmacie d'officine",
      "Conseiller en parapharmacie",
      "Responsable de rayon pharmacie",
      "Commercial en produits paramédicaux",
      "Gestionnaire de stock en pharmacie"
    ],
    scolarite: {
      title: "La Scolarité",
      couts: [
        { annee: "1ère année", montant: "1 500 000 FCFA" }
      ],
      message: "Votre choix d'études supérieures ne doit pas se faire à partir d'éléments financiers, mais à partir de vrais critères : qualité de la formation scientifique, technique et humaine, spécificités de l'école, correspondance avec votre projet personnel...",
      financement: "Pour les élèves brillants issus des milieux défavorisés, des dispositifs de financement ont été mis en place via le Fonds de solidarité."
    },
    campus: {
      title: "CAMPUS DOUALA",
      visits: [
        { name: "CAMPUS DOUALA", label: "VISITE GUIDÉE" }
      ]
    },
    contacts: {
      responsable: "Mme. Marie KOUADIO",
      email: "vendeur.pharmacie@ifpa.ci",
      telephone: "+225 07 08 09 10 12",
      bureau: "Bâtiment B - Bureau 205"
    }
  },
  'Auxiliaire de Vie': {
    title: 'Auxiliaire de Vie',
    cursus: [
      "La formation d'Auxiliaire de Vie, d'une durée de 1 an, prépare des professionnels de l'accompagnement et du soin à domicile pour les personnes âgées ou dépendantes.",
      "La formation alterne entre enseignements théoriques (gérontologie, psychologie, soins de base, ergonomie) et stages pratiques en structures d'accueil ou à domicile.",
      "L'étudiant en Auxiliaire de Vie de l'IFPA développe des compétences en aide à la personne, soins d'hygiène, et accompagnement social.",
      "Les stages en structures partenaires permettent à l'étudiant de se confronter aux réalités du terrain et de développer son sens de l'écoute.",
      "Un encadrement de proximité est assuré par des formateurs expérimentés du secteur social et médico-social."
    ],
    programme: {
      title: "Le programme",
      description: "La formation d'Auxiliaire de Vie à l'IFPA est portée par plusieurs domaines d'enseignement. Elle vise le développement de compétences essentielles pour un professionnel de l'accompagnement.",
      domains: [
        {
          name: "Sciences sociales et médicales",
          percentage: "40%",
          items: ["Gérontologie et vieillissement", "Psychologie et relation d'aide", "Soins d'hygiène et de confort", "Ergonomie et sécurité"]
        },
        {
          name: "Pratiques professionnelles",
          percentage: "35%",
          items: ["Alimentation et nutrition", "Animation et activités sociales", "Premiers secours", "Médicaments et administration"]
        },
        {
          name: "Compétences transversales",
          percentage: "25%",
          items: ["Législation sociale", "Communication professionnelle", "Éthique et déontologie", "Gestion des situations d'urgence"]
        }
      ]
    },
    debouches: [
      "Auxiliaire de vie à domicile",
      "Aide médico-psychologique",
      "Accompagnant en structure d'accueil",
      "Assistant de vie sociale",
      "Employé familial"
    ],
    scolarite: {
      title: "La Scolarité",
      couts: [
        { annee: "1ère année", montant: "1 500 000 FCFA" }
      ],
      message: "Votre choix d'études supérieures ne doit pas se faire à partir d'éléments financiers, mais à partir de vrais critères : qualité de la formation scientifique, technique et humaine, spécificités de l'école, correspondance avec votre projet personnel...",
      financement: "Pour les élèves brillants issus des milieux défavorisés, des dispositifs de financement ont été mis en place via le Fonds de solidarité."
    },
    campus: {
      title: "CAMPUS DOUALA",
      visits: [
        { name: "CAMPUS DOUALA", label: "VISITE GUIDÉE" },
        { name: "CAMPUS POINTE NOIRE", label: "VISITE GUIDÉE" }
      ]
    },
    contacts: {
      responsable: "Mme. Cécile YAO",
      email: "auxiliaire.vie@ifpa.ci",
      telephone: "+225 07 08 09 10 13",
      bureau: "Bâtiment C - Bureau 308"
    }
  },
  'Assistant en Cabinet Medicale': {
    title: 'Assistant en Cabinet Médical',
    cursus: [
      "La formation d'Assistant en Cabinet Médical, d'une durée de 2 ans, prépare des professionnels de la gestion administrative et de l'accueil en cabinet médical.",
      "La formation combine des enseignements théoriques (gestion, secrétariat médical, accueil, communication) et des stages pratiques en cabinets médicaux.",
      "L'étudiant en Assistant en Cabinet Médical de l'IFPA acquiert des compétences en gestion des dossiers patients, prise de rendez-vous, et relation avec les patients.",
      "Les stages en cabinets médicaux permettent à l'étudiant de se familiariser avec l'environnement professionnel et les logiciels médicaux.",
      "La formation met l'accent sur la discrétion professionnelle et le respect des données médicales confidentielles."
    ],
    programme: {
      title: "Le programme",
      description: "La formation d'Assistant en Cabinet Médical à l'IFPA est portée par plusieurs domaines d'enseignement. Elle vise le développement de compétences essentielles pour un professionnel de l'accueil médical.",
      domains: [
        {
          name: "Gestion administrative et médicale",
          percentage: "40%",
          items: ["Secrétariat médical", "Gestion des dossiers patients", "Prise de rendez-vous et planning", "Accueil et relation patient"]
        },
        {
          name: "Outils et technologies",
          percentage: "35%",
          items: ["Gestion administrative", "Comptabilité et facturation", "Informatique et logiciels médicaux", "Archivage et digitalisation"]
        },
        {
          name: "Compétences relationnelles",
          percentage: "25%",
          items: ["Confidentialité et éthique", "Communication professionnelle", "Anglais médical", "Gestion des conflits"]
        }
      ]
    },
    debouches: [
      "Assistant en cabinet médical",
      "Secrétaire médicale",
      "Gestionnaire de cabinet",
      "Agent d'accueil en structure de santé",
      "Assistant en clinique"
    ],
    scolarite: {
      title: "La Scolarité",
      couts: [
        { annee: "1ère année", montant: "1 800 000 FCFA" },
        { annee: "2ème année", montant: "1 800 000 FCFA" }
      ],
      message: "Votre choix d'études supérieures ne doit pas se faire à partir d'éléments financiers, mais à partir de vrais critères : qualité de la formation scientifique, technique et humaine, spécificités de l'école, correspondance avec votre projet personnel...",
      financement: "Pour les élèves brillants issus des milieux défavorisés, des dispositifs de financement ont été mis en place via le Fonds de solidarité."
    },
    campus: {
      title: "CAMPUS DOUALA",
      visits: [
        { name: "CAMPUS DOUALA", label: "VISITE GUIDÉE" }
      ]
    },
    contacts: {
      responsable: "Dr. Jean ASSI",
      email: "assistant.cabinet@ifpa.ci",
      telephone: "+225 07 08 09 10 14",
      bureau: "Bâtiment A - Bureau 105"
    }
  },
  'Aide Chimiste Biologiste': {
    title: 'Aide Chimiste Biologiste',
    cursus: [
      "La formation d'Aide Chimiste Biologiste, d'une durée de 2 ans, prépare des techniciens de laboratoire capables de réaliser des analyses biologiques et chimiques.",
      "La formation alterne entre enseignements théoriques (chimie, biologie, microbiologie, biochimie) et travaux pratiques en laboratoire.",
      "L'étudiant en Aide Chimiste Biologiste de l'IFPA développe des compétences en techniques d'analyse, manipulation des échantillons, et interprétation des résultats.",
      "Les stages en laboratoires partenaires permettent à l'étudiant de se familiariser avec les équipements et les protocoles de sécurité.",
      "Un accompagnement individualisé est assuré par des formateurs expérimentés du domaine de la biologie médicale."
    ],
    programme: {
      title: "Le programme",
      description: "La formation d'Aide Chimiste Biologiste à l'IFPA est portée par plusieurs domaines d'enseignement. Elle vise le développement de compétences essentielles pour un technicien de laboratoire.",
      domains: [
        {
          name: "Sciences fondamentales",
          percentage: "40%",
          items: ["Chimie générale et organique", "Biologie cellulaire et moléculaire", "Microbiologie et immunologie", "Biochimie clinique"]
        },
        {
          name: "Techniques de laboratoire",
          percentage: "35%",
          items: ["Techniques d'analyse", "Instruments de laboratoire", "Préparation des échantillons", "Culture et identification"]
        },
        {
          name: "Compétences professionnelles",
          percentage: "25%",
          items: ["Sécurité en laboratoire", "Statistiques et interprétation", "Anglais scientifique", "Qualité et certification"]
        }
      ]
    },
    debouches: [
      "Technicien de laboratoire d'analyses",
      "Aide chimiste biologiste",
      "Assistant en laboratoire de recherche",
      "Contrôleur qualité en industrie pharmaceutique",
      "Technicien en biologie médicale"
    ],
    scolarite: {
      title: "La Scolarité",
      couts: [
        { annee: "1ère année", montant: "1 800 000 FCFA" },
        { annee: "2ème année", montant: "1 800 000 FCFA" }
      ],
      message: "Votre choix d'études supérieures ne doit pas se faire à partir d'éléments financiers, mais à partir de vrais critères : qualité de la formation scientifique, technique et humaine, spécificités de l'école, correspondance avec votre projet personnel...",
      financement: "Pour les élèves brillants issus des milieux défavorisés, des dispositifs de financement ont été mis en place via le Fonds de solidarité."
    },
    campus: {
      title: "CAMPUS DOUALA",
      visits: [
        { name: "CAMPUS DOUALA", label: "VISITE GUIDÉE" },
        { name: "CAMPUS POINTE NOIRE", label: "VISITE GUIDÉE" }
      ]
    },
    contacts: {
      responsable: "Dr. Henri BAMBA",
      email: "aide.biologiste@ifpa.ci",
      telephone: "+225 07 08 09 10 15",
      bureau: "Bâtiment D - Bureau 410"
    }
  }
};

// Composants pour les différents onglets
const ProgrammeTab = ({ programme }) => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
      {programme.title}
    </Typography>
    <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
      {programme.description}
    </Typography>
    
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
      Domaines d'enseignement
    </Typography>
    
    <Grid container spacing={3}>
      {programme.domains.map((domain, index) => (
        <Grid item xs={12} key={index}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {domain.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: 'primary.main', fontWeight: 600 }}>
                {domain.percentage}
              </Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <List dense>
              {domain.items.map((item, idx) => (
                <ListItem key={idx} sx={{ py: 0.5 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <CheckCircleIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const DebouchesTab = ({ debouches }) => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
      Débouchés professionnels
    </Typography>
    <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
      Les diplômés de cette formation peuvent exercer dans les secteurs suivants :
    </Typography>
    <Grid container spacing={2}>
      {debouches.map((item, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
              <Typography variant="body1">{item}</Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const ScolariteTab = ({ scolarite }) => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
      {scolarite.title}
    </Typography>
    
    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
      Coût des études à l'IFPA
    </Typography>
    
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {scolarite.couts.map((cout, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card sx={{ bgcolor: 'background.default' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <SchoolIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {cout.annee}
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
                {cout.montant}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    
    <Typography variant="body1" paragraph sx={{ color: 'text.secondary', mb: 3 }}>
      {scolarite.message}
    </Typography>
    
    <Paper elevation={0} sx={{ p: 3, bgcolor: 'primary.light', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <AttachMoneyIcon sx={{ color: 'primary.main', mr: 2, mt: 0.5 }} />
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {scolarite.financement}
        </Typography>
      </Box>
    </Paper>
  </Box>
);

const CampusTab = ({ campus }) => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
      {campus.title}
    </Typography>
    
    <Grid container spacing={3}>
      {campus.visits.map((visit, index) => (
        <Grid item xs={12} sm={6} key={index}>
          <Card sx={{ position: 'relative', overflow: 'hidden' }}>
            <CardMedia
              component="img"
              height="250"
              image={`/assets/campus/campus-${index + 1}.jpg`}
              alt={visit.name}
              sx={{ objectFit: 'cover' }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                p: 2,
                textAlign: 'center'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {visit.name}
              </Typography>
              <Typography variant="overline" sx={{ letterSpacing: 2 }}>
                {visit.label}
              </Typography>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const ContactsTab = ({ contacts }) => (
  <Box>
    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
      Contacts
    </Typography>
    <Typography variant="body1" paragraph sx={{ mb: 4, color: 'text.secondary' }}>
      Pour toute information supplémentaire, n'hésitez pas à nous contacter :
    </Typography>
    
    <Card sx={{ p: 3 }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <LocationOnIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Responsable de la formation"
            secondary={contacts.responsable}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <EmailIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Email"
            secondary={contacts.email}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <PhoneIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Téléphone"
            secondary={contacts.telephone}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemIcon>
            <LocationOnIcon color="primary" />
          </ListItemIcon>
          <ListItemText 
            primary="Bureau"
            secondary={contacts.bureau}
            primaryTypographyProps={{ fontWeight: 600 }}
          />
        </ListItem>
      </List>
    </Card>
  </Box>
);

function FiliereDetail() {
  const { slug } = useParams();
  
  // Trouver la filière correspondant au slug
  const filiere = filieres.find(f => f.link === `/formation/${slug}`) || filieres[0];
  
  // Récupérer les détails de la filière
  const filiereDetails = filiereDetailsData[filiere.title] || filiereDetailsData['Delegue Medicale'];
  
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box>
      {/* Fil d'ariane */}
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        <Breadcrumbs separator="»" sx={{ fontSize: '0.85rem' }}>
          <Link component={RouterLink} to="/formation" underline="hover" color="primary">
            Formation
          </Link>
          <Typography color="text.primary" sx={{ fontSize: '0.85rem' }}>
            {filiereDetails.title}
          </Typography>
        </Breadcrumbs>
      </Container>

      {/* Titre */}
      <Container maxWidth="lg" sx={{ textAlign: 'center', py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 2 }}>
            NOS FORMATIONS
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            {filiereDetails.title}
          </Typography>
        </motion.div>
      </Container>

      {/* Onglets */}
      <FiliereTabs value={tabValue} onChange={(e, val) => setTabValue(val)} />

      {/* Contenu de l'onglet actif */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={tabValue}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabValue === 0 && <CursusTab paragraphs={filiereDetails.cursus} />}
            {tabValue === 1 && <ProgrammeTab programme={filiereDetails.programme} />}
            {tabValue === 2 && <DebouchesTab debouches={filiereDetails.debouches} />}
            {tabValue === 3 && <ScolariteTab scolarite={filiereDetails.scolarite} />}
            {tabValue === 4 && <CampusTab campus={filiereDetails.campus} />}
            {tabValue === 5 && <ContactsTab contacts={filiereDetails.contacts} />}
          </motion.div>
        </AnimatePresence>
      </Container>
    </Box>
  );
}

export default FiliereDetail;