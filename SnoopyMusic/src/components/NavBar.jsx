import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const navigate = useNavigate();

  // Atualiza o estado se o evento customizado for disparado
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem('user'));
    };

    window.addEventListener('loginStatusChanged', checkLoginStatus);

    return () => {
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);

    // Dispara evento para atualizar outros componentes, se necessário
    window.dispatchEvent(new Event('loginStatusChanged'));
    navigate('/');
  };

  if (isLoggedIn) {
    return (
      <>
        <nav className="top-nav">
          <div className="nav-left">
            <div className="logo">
              <i className="fas fa-dog"></i>
              Snoopy Songs
            </div>
            <div className="nav-search">
              <input type="text" placeholder="O que você quer ouvir?" />
            </div>
          </div>

          <ul className="nav-links">
            <li><a href="#"><i className="fas fa-home"></i> Início</a></li>
            <li><a href="#">Categotias</a></li>
            <li><a href="#">PlayList</a></li>
          </ul>

          <div className="nav-right">
            <button className="login" onClick={handleLogout}>Sair</button>
          </div>
        </nav>

        <div className="sidebar">
          <h2>Sua Biblioteca</h2>
          <div className="playlist">
            <p>Crie sua primeira playlist</p>
            <button onClick={() => alert('Criar playlist')}>Criar playlist</button>
          </div>

          <h2>Músicas Favoritas</h2>
          <div className="playlist">
            <p>Explore artistas e faixas recomendadas para você</p>
            <button onClick={() => alert('Explorar agora')}>Favoritas</button>
          </div>

          <h2>Músicas Tocadas Recentemente</h2>
          <div className="playlist">
            <p>Explore artistas e faixas recomendadas para você</p>
            <button onClick={() => alert('Explorar agora')}>Recentementes</button>
          </div>

          <ul className="links">
            <li><a href="#">Legal</a></li>
            <li><a href="#">Política de privacidade</a></li>
          </ul>
        </div>
      </>
    );
  }

  return (
    <header>
      <div className="logo">Snoopy Music</div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav>
        <ul className={menuOpen ? 'open' : ''}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Início</Link></li>
          <li><Link to="/HomePrivate" onClick={() => setMenuOpen(false)}>HomePrivate</Link></li>
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Entrar</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
