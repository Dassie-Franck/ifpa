import { useRef } from 'react';

// Capture l'heure de montage du formulaire, pour calculer côté client
// un délai minimum de remplissage avant soumission (indice anti-bot supplémentaire).
function useFormTiming() {
  const startTimeRef = useRef(Date.now());

  const getElapsedSeconds = () => Math.floor((Date.now() - startTimeRef.current) / 1000);

  return { getElapsedSeconds };
}

export default useFormTiming;