import api from './api';

export const candidatureService = {
  async submit(formData, website = '') {
    const payload = new FormData();
    payload.append('website', website); // honeypot
    payload.append('nom', formData.nom);
    payload.append('prenom', formData.prenom);
    payload.append('telephone', formData.telephone);
    payload.append('genre', formData.genre === 'M' ? 'M' : 'F');
    payload.append('date_naissance', formData.dateNaissance);
    payload.append('email', formData.email);
    payload.append('adresse', formData.adresse);
    payload.append('niveau_etudes', formData.niveauEtudes);
    payload.append('filiere_id', formData.filiereId);
    payload.append('ramettes_papier_payantes', formData.ramettesPapierPayantes ? '1' : '0');
    if (formData.demandeManuscrite) payload.append('demande_manuscrite', formData.demandeManuscrite);
    if (formData.diplomeReleveNotes) payload.append('diplome_releve_notes', formData.diplomeReleveNotes);
    if (formData.acteNaissance) payload.append('acte_naissance', formData.acteNaissance);
    if (formData.carteIdentite) payload.append('carte_identite', formData.carteIdentite);
    if (formData.photoIdentite) payload.append('photo_identite', formData.photoIdentite);

    const response = await api.post('/candidatures', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },

  async getMesCandidatures() {
    const response = await api.get('/candidat/mes-candidatures');
    return response.data;
  },

  async resoumettre(candidatureId, documentsUpdates) {
    const payload = new FormData();

    Object.entries(documentsUpdates).forEach(([type, file]) => {
      if (file) payload.append(type, file);
    });

    const response = await api.post(`/candidat/candidatures/${candidatureId}/resoumettre`, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },

  async lierCandidature(reference) {
    const response = await api.post('/candidat/candidatures/lier', { reference });
    return response.data;
  },
};