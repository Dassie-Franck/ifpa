import { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import api from '../services/api';

const CandidatAuthContext = createContext(null);

// Centralise l'état de connexion du candidat : token stocké en cookie,
// utilisateur courant, fonctions login/register/logout réutilisables partout.
export function CandidatAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('candidat_token');
    if (!token) {
      setLoading(false);
      return;
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    api
      .get('/candidat/me')
      .then((res) => setUser(res.data))
      .catch(() => {
        Cookies.remove('candidat_token');
        delete api.defaults.headers.common['Authorization'];
      })
      .finally(() => setLoading(false));
  }, []);

  // === MODIFICATION : ajout du paramètre website avec valeur par défaut ===
  const login = async (email, password, website = '') => {
    const response = await api.post('/candidat/login', { email, password, website });
    const { user: userData, token } = response.data;

    Cookies.set('candidat_token', token, { expires: 7 });
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);

    return userData;
  };

  // === MODIFICATION : ajout du paramètre website avec valeur par défaut ===
  const register = async (name, email, password, passwordConfirmation, website = '') => {
    const response = await api.post('/candidat/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      website,
    });
    const { user: userData, token } = response.data;

    Cookies.set('candidat_token', token, { expires: 7 });
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);

    return userData;
  };

  const logout = async () => {
    try {
      await api.post('/candidat/logout');
    } finally {
      Cookies.remove('candidat_token');
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  return (
    <CandidatAuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </CandidatAuthContext.Provider>
  );
}

export function useCandidatAuth() {
  const context = useContext(CandidatAuthContext);
  if (!context) {
    throw new Error('useCandidatAuth doit être utilisé à l\'intérieur de CandidatAuthProvider');
  }
  return context;
}