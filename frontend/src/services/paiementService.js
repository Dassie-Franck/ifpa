import api from './api';

export const paiementService = {
  async getStatutDossier(token) {
    const response = await api.get(`/candidatures/suivi/${token}`);
    return response.data;
  },

  async initierPaiement(tokenSuivi, methode) {
    const response = await api.post('/paiements/initier', {
      token_suivi: tokenSuivi,
      methode,
    });
    return response.data;
  },
};