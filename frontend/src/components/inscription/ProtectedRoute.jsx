import { Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { useCandidatAuth } from '../../context/CandidatAuthContext';

// Empêche l'accès aux pages du dashboard candidat si non connecté
function ProtectedRoute({ children }) {
  const { user, loading } = useCandidatAuth();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/inscription/connexion" replace />;
  }

  return children;
}

export default ProtectedRoute;