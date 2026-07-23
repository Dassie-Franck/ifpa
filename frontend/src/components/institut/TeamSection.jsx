import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import TeamMemberCard from './TeamMemberCard';

// Bloc "Nos équipes {campus}" — titre + grille de cartes membres
function TeamSection({ campusName, members }) {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 4 }}>
            Nos équipes{' '}
            <Box component="span" sx={{ color: 'primary.main' }}>{campusName}</Box>
          </Typography>
        </motion.div>

        <Grid container spacing={3}>
          {members.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={member.email}>
              <TeamMemberCard {...member} delay={index * 0.08} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default TeamSection;