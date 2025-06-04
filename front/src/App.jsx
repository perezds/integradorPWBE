import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import SettingsPage from './components/SettingsPage';
import MenuPage from './components/MenuPage';
import MensagensPage from './components/MensagensPage';
import Profile from './components/Profile';
import Footer from './components/Footer';
import Sensores from './components/Sensores'
import Cadastro from './pages/Cadastro';
import MapaPage from './components/MapaPage';
import Ajuda from './components/Ajuda';

function App() {
  const location = useLocation();

  const hideFooterRoutes = ['/', '/cadastro'];

  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ajuda" element={<Ajuda/>} />
        <Route path="/config" element={<SettingsPage />} />
        <Route path="/mapa" element={<MapaPage/>} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/mensagens" element={<MensagensPage />} />
        <Route path="/settings/sensores" element={<Sensores />} />
        <Route path="/settings/perfil" element={<Profile />} />
       
      </Routes>

      {shouldShowFooter && <Footer />}
    </>
  );
}

export default App;
