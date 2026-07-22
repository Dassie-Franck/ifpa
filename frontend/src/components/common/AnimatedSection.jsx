import { motion } from 'framer-motion';

// Wrapper générique : fait apparaître son contenu en fondu + léger décalage vers le haut
// dès qu'il entre dans le viewport (effet "transition PowerPoint" au scroll).
function AnimatedSection({ children, delay = 0, direction = 'up', ...props }) {
  const directions = {
    up: { y: 40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 40 },
    none: { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;