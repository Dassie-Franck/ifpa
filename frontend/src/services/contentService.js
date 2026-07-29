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
  async getEquipe() {
  const response = await api.get('/equipe');
  return response.data.data;
},
async getGalerie(categorie = '') {
  const response = await api.get('/galerie', {
    params: categorie ? { categorie } : {},
  });
  return response.data.data;
},
async getEspacePresse(type = '') {
  const response = await api.get('/espace-presse', {
    params: type ? { type } : {},
  });
  return response.data;
},
async getPartenariats(type = '') {
  const response = await api.get('/partenariats-stages', {
    params: type ? { type } : {},
  });
  return response.data.data;
},
async getDocumentsInstitutionnels() {
  const response = await api.get('/documents-institutionnels');
  return response.data;
},
};