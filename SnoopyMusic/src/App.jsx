import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Premium from './pages/Premium'; // importa a página Premium
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import HomePrivate from './pages/HomePrivate';
import Perfil from './pages/Perfil';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/HomePrivate" element={<HomePrivate />} />
        <Route path="/premium" element={<Premium />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/perfil" element={<Perfil/>} />
      </Routes>
    </Router>
  );
}

export default App;
