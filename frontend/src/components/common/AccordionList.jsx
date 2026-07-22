import { useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

// items = [{ title: string, content: string|node }]
// defaultOpenIndex = index ouvert par défaut (0 = premier item, null = tout fermé)
function AccordionList({ items, defaultOpenIndex = 0 }) {
  const [expanded, setExpanded] = useState(defaultOpenIndex);

  const handleChange = (index) => (event, isExpanded) => {
    setExpanded(isExpanded ? index : null);
  };

  return (
    <Box>
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
        >
          <Accordion
            expanded={expanded === index}
            onChange={handleChange(index)}
            disableGutters
            elevation={0}
            sx={{
              bgcolor: 'primary.dark',
              color: '#fff',
              mb: 0.5,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={
                expanded === index ? (
                  <RemoveIcon sx={{ color: '#fff' }} />
                ) : (
                  <AddIcon sx={{ color: '#fff' }} />
                )
              }
              sx={{ px: 3 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <StarIcon sx={{ fontSize: 18, opacity: 0.85 }} />
                <Typography sx={{ fontWeight: 700, fontSize: '0.85rem', letterSpacing: 0.5 }}>
                  {item.title}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: '#fdf5f5', color: 'text.primary', px: 3, py: 2 }}>
              <Typography variant="body2">{item.content}</Typography>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ))}
    </Box>
  );
}

export default AccordionList;