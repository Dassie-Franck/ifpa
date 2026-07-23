import { Box, Container, Grid, Button, Stack } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressionSidebar from './ProgressionSidebar';

// Variantes d'animation façon "transition PowerPoint" : glissement horizontal
// selon le sens de navigation (avant = vient de la droite, arrière = vient de la gauche)
const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction > 0 ? -80 : 80, opacity: 0 }),
};

function FormStepLayout({
  centreLabel,
  steps,
  activeStep,
  direction,
  onPrevious,
  onNext,
  isNextDisabled, // La prop est déjà correctement nommée
  children,
}) {
  return (
    <Box>
      {/* Bandeau "Centre sélectionné" */}
      <Box sx={{ bgcolor: 'primary.main', py: 2 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Box sx={{ color: '#fff', fontWeight: 700, textAlign: 'center' }}>
              Centre sélectionné : {centreLabel}
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Grid container spacing={4}>
          {/* Contenu de l'étape active - avec transition PowerPoint */}
          <Grid item xs={12} md={8}>
            <Box sx={{ position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>

              {/* Boutons navigation */}
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  onClick={onPrevious}
                  disabled={activeStep === 0}
                  sx={{
                    bgcolor: 'primary.main',
                    fontWeight: 700,
                    '&:hover': { bgcolor: 'primary.dark' },
                    '&.Mui-disabled': { bgcolor: '#f0c39a', color: '#fff' },
                  }}
                >
                  Précédent
                </Button>
                <Button
                  variant="contained"
                  onClick={onNext}
                  disabled={isNextDisabled}
                  sx={{
                    bgcolor: 'primary.main',
                    fontWeight: 700,
                    opacity: isNextDisabled ? 0.6 : 1,
                    '&:hover': { bgcolor: 'primary.dark' },
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Soumettre' : 'Continuer'}
                </Button>
              </Stack>
            </Box>
          </Grid>

          {/* Panneau de progression */}
          <Grid item xs={12} md={4}>
            <ProgressionSidebar steps={steps} activeStep={activeStep} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default FormStepLayout;