import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleReCaptchaProvider } from '@google-recaptcha/react'; 
import MainLayout from './components/layout/MainLayout';
import Accueil from './pages/Accueil';
import Formation from './pages/Formation';
import FiliereDetail from './pages/FiliereDetail';
import Admission from './pages/Admission';
import QuiSommesNous from './pages/QuiSommesNous';
import InscriptionLayout from './components/inscription/InscriptionLayout';
import EspaceInscriptionAccueil from './pages/EspaceInscriptionAccueil';
import InscriptionSelection from './pages/InscriptionSelection';
import InscriptionFormulaire from './pages/InscriptionFormulaire';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import ProtectedRoute from './components/inscription/ProtectedRoute';
import ApprochesPedagogiques from './pages/ApprochesPedagogiques';
import NosEquipes from './pages/NosEquipes';
import CandidatDashboard from './pages/CandidatDashboard';
import InscriptionSuivi from './pages/InscriptionSuivi';
import PresentationSite from './pages/PresentationSite';
import EspacePresse from './pages/EspacePresse';
import StructuresStage from './pages/StructuresStage';
import Contact from './pages/Contact';

function App() {
  return (
    //  Le Provider englobe tout le routeur
    <GoogleReCaptchaProvider
      siteKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      type="v3"
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Accueil />} />
            <Route path="formation" element={<Formation />} />
            <Route path="formation/:slug" element={<FiliereDetail />} />
            <Route path="admission" element={<Admission />} />

            <Route path="institut/qui-sommes-nous" element={<QuiSommesNous />} />
            <Route path="institut/pedagogicalApproach" element={<ApprochesPedagogiques />} />
            <Route path="institut/nos-equipes" element={<NosEquipes />} />
            <Route path="vie-au-campus/presentation" element={<PresentationSite />} />
            <Route path="institut/espace-presse" element={<EspacePresse />} />
            <Route path="partenariats/structures-de-stage" element={<StructuresStage />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          <Route path="inscription" element={<InscriptionLayout />}>
            <Route index element={<EspaceInscriptionAccueil />} />
            <Route path="selection" element={<InscriptionSelection />} />
            <Route path="formulaire" element={<InscriptionFormulaire />} />
            <Route path="connexion" element={<LoginPage />} />
            <Route path="creer-compte" element={<Register />} />
            <Route path="suivi/:token" element={<InscriptionSuivi />} />
            <Route
              path="tableau-de-bord"
              element={
                <ProtectedRoute>
                  <CandidatDashboard />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="inscription/connexion" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}

export default App;