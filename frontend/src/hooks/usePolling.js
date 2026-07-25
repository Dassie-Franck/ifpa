import { useEffect, useRef } from 'react';

// Exécute périodiquement une fonction (par défaut toutes les 15s), en laissant
// la fonction elle-même décider quand s'arrêter (utile pour économiser les
// appels une fois qu'on est sur un onglet inactif).
function usePolling(callback, intervalMs = 15000, enabled = true) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => savedCallback.current();
    const interval = setInterval(tick, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, enabled]);
}

export default usePolling;