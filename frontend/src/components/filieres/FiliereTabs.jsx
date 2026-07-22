import { Box, Container, Tabs, Tab } from '@mui/material';
import { motion } from 'framer-motion';

// Onglets de la fiche filière (§6.3 du cahier des charges)
const tabsList = ['Cursus', 'Programme', 'Débouchés', 'Scolarité', 'Campus', 'Contacts'];

function FiliereTabs({ value, onChange }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ bgcolor: 'primary.main' }}>
        <Container maxWidth="lg" disableGutters>
          <Tabs
            value={value}
            onChange={onChange}
            variant="scrollable"
            scrollButtons="auto"
            TabIndicatorProps={{ style: { display: 'none' } }}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 700,
                fontSize: '0.8rem',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
                px: 3,
                py: 2,
              },
              '& .Mui-selected': {
                color: '#fff !important',
                bgcolor: 'primary.dark',
              },
            }}
          >
            {tabsList.map((tab) => (
              <Tab key={tab} label={tab} />
            ))}
          </Tabs>
        </Container>
      </Box>
    </motion.div>
  );
}

export default FiliereTabs;