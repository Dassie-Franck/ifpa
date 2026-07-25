import api from './api';

export const contentService = {
  async getActualites() {
    const response = await api.get('/actualites');
    return response.data.data;
  },

  async getEvenements() {
    const response = await api.get('/evenements');
    return response.data.data;
  },

  async getTemoignages() {
    const response = await api.get('/temoignages');
    return response.data.data;
  },

  async getPartenaires() {
    const response = await api.get('/partenaires');
    return response.data.data;
  },

  async getCampus() {
    const response = await api.get('/campus');
    return response.data.data;
  },
};