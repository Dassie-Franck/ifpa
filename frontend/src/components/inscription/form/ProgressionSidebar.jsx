import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';

// Panneau de progression du formulaire (§6.5) — reflète l'étape active du parcours candidat
function ProgressionSidebar({ steps, activeStep }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Box sx={{ bgcolor: '#f0f0f0', p: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2.5 }}>
          Progression de remplissage
        </Typography>

        <Stack spacing={0} sx={{ position: 'relative' }}>
          {/* Ligne verticale de fond */}
          <Box
            sx={{
              position: 'absolute',
              left: 5,
              top: 6,
              bottom: 6,
              width: 2,
              bgcolor: '#ddd',
            }}
          />
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isDone = index < activeStep;
            return (
              <Stack
                key={step}
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ py: 1.4, position: 'relative', zIndex: 1 }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    backgroundColor: isActive || isDone ? '#F5821F' : '#ccc',
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: '50%',
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'text.primary' : 'text.secondary',
                  }}
                >
                  {step}
                </Typography>
              </Stack>
            );
          })}
        </Stack>
      </Box>
    </motion.div>
  );
}

export default ProgressionSidebar;