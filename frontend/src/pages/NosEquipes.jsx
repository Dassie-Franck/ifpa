import { Box } from '@mui/material';
import PageBanner from '../components/common/PageBanner';
import TeamSection from '../components/institut/TeamSection';

// Données provisoires — à remplacer par les vrais membres de l'équipe IFPA
// (photo, nom, fonction, email) une fois transmis par la direction / API Laravel (/api/v1/equipe)
const campus1Team = [
  { name: 'M. [Nom Directeur]', role: 'Directeur', email: 'directeur@ifpa.com', photo: '/assets/equipe/directeur-1.jpg' },
  { name: 'Dr [Nom]', role: 'Directeur des études', email: 'etudes@ifpa.com', photo: '/assets/equipe/directeur-etudes-1.jpg' },
  { name: '[Nom]', role: 'Responsable administrative et financière', email: 'admin@ifpa.com', photo: '/assets/equipe/raf-1.jpg' },
  { name: '[Nom]', role: 'Responsable pédagogique — Soins infirmiers', email: 'pedagogie.si@ifpa.com', photo: '/assets/equipe/pedagogie-1.jpg' },
  { name: '[Nom]', role: 'Responsable pédagogique — Sage-femme', email: 'pedagogie.sf@ifpa.com', photo: '/assets/equipe/pedagogie-2.jpg' },
  { name: '[Nom]', role: 'Responsable communication & partenariats', email: 'communication@ifpa.com', photo: '/assets/equipe/communication-1.jpg' },
  { name: '[Nom]', role: 'Responsable relations structures de stage', email: 'stages@ifpa.com', photo: '/assets/equipe/stages-1.jpg' },
  { name: '[Nom]', role: 'Responsable qualité', email: 'qualite@ifpa.com', photo: '/assets/equipe/qualite-1.jpg' },
];

function NosEquipes() {
  return (
    <Box>
      <PageBanner image="/assets/banners/institut-banner.jpg" breadcrumbLabel="Nos équipes" />
      <TeamSection campusName="Campus Principal" members={campus1Team} />
      {/* Si l'IFPA compte plusieurs campus/antennes, ajouter d'autres <TeamSection /> ici */}
    </Box>
  );
}

export default NosEquipes;