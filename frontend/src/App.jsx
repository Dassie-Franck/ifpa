import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Accueil from './pages/Accueil';
import Formation from './pages/Formation';
import FiliereDetail from './pages/FiliereDetail';
import Admission from './pages/Admission';
import QuiSommesNous from './pages/QuiSommesNous';
import InscriptionLayout from './components/inscription/InscriptionLayout';
import EspaceInscriptionAccueil from './pages/EspaceInscriptionAccueil';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Accueil />} />
          <Route path="formation" element={<Formation />} />
          <Route path="formation/:slug" element={<FiliereDetail />} />
          <Route path="admission" element={<Admission />} />

          {/* Sous-pages de L'Institut - note le chemin imbriqué */}
          <Route path="institut/qui-sommes-nous" element={<QuiSommesNous />} />
        </Route>
        <Route path="inscription" element={<InscriptionLayout />}>
  <Route index element={<EspaceInscriptionAccueil />} />
</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;