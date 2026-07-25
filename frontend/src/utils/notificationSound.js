// Joue un son de notification discret (comme sur téléphone).
// Le navigateur peut bloquer l'autoplay tant qu'aucune interaction utilisateur
// n'a eu lieu sur la page — comportement standard, pas un bug.
export function playNotificationSound() {
  try {
    const audio = new Audio('/sounds/notifications.wav');
    audio.volume = 0.5;
    audio.play().catch(() => {
      // Autoplay bloqué — ignoré silencieusement
    });
  } catch (err) {
    // Ignoré
  }
}