import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

// Si le token est expiré/invalide (401), nettoie la session locale et redirige
// proprement vers la connexion plutôt que de laisser l'app dans un état incohérent.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('candidat_token');
      delete api.defaults.headers.common['Authorization'];

      if (!window.location.pathname.includes('/connexion')) {
        window.location.href = '/inscription/connexion';
      }
    }
    return Promise.reject(error);
  }
);

export default api;