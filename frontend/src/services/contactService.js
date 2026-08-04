import api from './api';

export const contactService = {
  async submit(formData, website = '') {
    const payload = {
      nom: formData.nom,
      email: formData.email,
      sujet: formData.sujet,
      message: formData.message,
      website, // honeypot
      'g-recaptcha-response': recaptchaToken, // reCAPTCHA
    };

    const response = await api.post('/contact', payload);
    return response.data;
  },
};