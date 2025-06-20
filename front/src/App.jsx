import { Routes, Route, useLocation } from 'react-router-dom';

import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';

import SettingsPage from './components/SettingsPage';
import MenuPage from './components/MenuPage';
import MensagensPage from './components/MensagensPage';
import ProfilePage from './components/Profile';
import Footer from './components/Footer';
import Sensores from './components/Sensores';
import MapaPage from './components/MapaPage';
import Ajuda from './components/Ajuda';
import ModalSensores from './components/ModalSensores';
import ExportButton from './components/ExportButton';

import Ambientes from './components/Ambientes';
import Historico from './components/Historicos';

function App() {
  const location = useLocation();

  const hideFooterRoutes = ['/', '/cadastro'];
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  const exportRoutes = [
    '/settings/sensores',
    '/settings/ambientes',
    '/settings/historico',
  ];

  const shouldShowExportButton = exportRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ajuda" element={<Ajuda />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/settings/sensores" element={<Sensores />} />
        <Route path="/settings/perfil" element={<ProfilePage />} />
        <Route path="/settings/ambientes" element={<Ambientes />} />
        <Route path="/settings/historico" element={<Historico />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mensagens" element={<MensagensPage />} />
        <Route path="/mapa" element={<MapaPage />} />
      </Routes>

      <ModalSensores />

      {shouldShowExportButton && <ExportButton />}
      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
