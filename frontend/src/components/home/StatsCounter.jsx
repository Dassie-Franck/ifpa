import { Box, Grid, Typography } from '@mui/material';
import { CountUp } from 'react-countup'; // ← import nommé (plus fiable)
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: 5, suffix: 'ans', label: "d'existence", bg: 'primary.main', color: '#fff' },
  { value: 320, prefix: '+', label: 'Diplômés formés', bg: 'grey.700', color: '#fff' },
  { value: 45, prefix: '+', label: 'Structures de stage partenaires', bg: 'primary.dark', color: '#fff' },
  { value: 12, prefix: '+', label: 'Missions et interventions terrain', bg: 'grey.400', color: '#2B2B2B' },
];

function StatsCounter() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  // Fallback de sécurité : si CountUp n'est pas une fonction, on affiche la valeur sans animation
  const CountUpComponent = typeof CountUp === 'function' ? CountUp : ({ end }) => <span>{end}</span>;

  return (
    <Box ref={ref}>
      <Grid container>
        {stats.map((stat, index) => (
          <Grid
            key={index}
            sx={{
              flexBasis: { xs: '50%', md: '20%' },
              maxWidth: { xs: '50%', md: '20%' },
              flexGrow: 0,
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                bgcolor: stat.bg,
                color: stat.color,
                py: 3,
                px: 2,
                textAlign: 'center',
                minHeight: 100,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                {stat.prefix}
                {inView ? <CountUpComponent end={stat.value} duration={2} /> : 0}
                {stat.suffix}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.9 }}>
                {stat.label}
              </Typography>
            </Box>
          </Grid>
        ))}

        {/* 5e bloc : 2 Campus */}
        <Grid
          sx={{
            flexBasis: { xs: '100%', md: '20%' },
            maxWidth: { xs: '100%', md: '20%' },
            flexGrow: 0,
            flexShrink: 0,
          }}
        >
          <Box
            sx={{
              bgcolor: 'grey.700',
              color: '#fff',
              py: 3,
              px: 2,
              textAlign: 'center',
              minHeight: 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              1 Campus
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Douala  
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StatsCounter;