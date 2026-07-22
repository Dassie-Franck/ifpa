import { Box, Container, Grid } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import AccordionList from '../common/AccordionList';

// FAQ admission (§6.4 du cahier des charges) — colonne 1
const faqColumn1 = [
  {
    title: 'AVEZ-VOUS DES FILIÈRES COMMERCIALES / GESTION ?',
    content:
      "L'IFPA est un institut spécialisé exclusivement dans les formations paramédicales (soins infirmiers, aide-soignant, sage-femme, technicien de laboratoire, etc.). Aucune filière commerciale ou de gestion n'est proposée à ce jour.",
  },
  {
    title: "QUEL EST L'ÂGE LIMITE POUR POSTULER ?",
    content:
      "L'âge limite varie selon la filière choisie. Consultez la fiche détaillée de chaque filière (page Formation) pour connaître les conditions d'accès spécifiques.",
  },
  {
    title: 'LES DIPLÔMES SONT-ILS RECONNUS ?',
    content:
      "Oui, les diplômes délivrés par l'IFPA sont reconnus par les autorités compétentes du secteur de la santé. Voir la page Institut pour le détail des agréments et reconnaissances officielles.",
  },
  {
    title: 'COMMENT VOUS CONTACTER SUR WHATSAPP ?',
    content:
      "Utilisez les boutons WhatsApp dédiés à chaque campus, disponibles en haut de cette page, pour une réponse rapide de l'équipe des admissions.",
  },
];

// FAQ admission — colonne 2
const faqColumn2 = [
  {
    title: 'QUEL EST LE MONTANT DES FRAIS DE FORMATION ?',
    content:
      "Les frais varient selon la filière et sa durée. Le détail est disponible sur la fiche de chaque filière, dans la section « Frais de formation et modalités de paiement ».",
  },
  {
    title: "COMMENT POSTULER AU CONCOURS D'ADMISSION ?",
    content:
      "Rendez-vous sur la page Admission > Je m'inscris, choisissez votre filière, payez les frais de dossier, puis complétez le formulaire d'inscription en ligne avec vos pièces justificatives.",
  },
  {
    title: 'Y A-T-IL UN INTERNAT / DES RÉSIDENCES ÉTUDIANTES ?',
    content:
      "Selon le campus, des solutions d'hébergement peuvent être proposées ou recommandées. Contactez l'équipe administrative pour plus de détails.",
  },
  {
    title: 'Y A-T-IL DES STAGES PRÉVUS DANS LA FORMATION ?',
    content:
      "Oui, chaque filière comprend une période de stage pratique au sein de structures de santé partenaires (hôpitaux, cliniques), essentielle à l'obtention du diplôme.",
  },
];

function AdmissionFaq() {
  return (
    <Box id="faq" sx={{ py: 8, bgcolor: '#fafafa' }}>
      <Container maxWidth="lg">
        <SectionTitle label="PLUS D'INFORMATIONS" title="FAQ" />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <AccordionList items={faqColumn1} defaultOpenIndex={0} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AccordionList items={faqColumn2} defaultOpenIndex={0} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AdmissionFaq;