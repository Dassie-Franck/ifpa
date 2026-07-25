import api from './api';

// Centralise tous les appels liés aux filières — la page Formation et la fiche
// détail filière consomment ce service plutôt que d'appeler axios directement.
export const filiereService = {
  async getAll(search = '') {
    const response = await api.get('/filieres', {
      params: search ? { search } : {},
    });
    return response.data.data; // Laravel API Resource enveloppe la liste dans "data"
  },

  async getBySlug(slug) {
    const response = await api.get(`/filieres/${slug}`);
    return response.data.data;
  },
};