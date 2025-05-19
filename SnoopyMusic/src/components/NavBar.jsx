import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './NavBar.css';
import defaultAvatar from '../img/avatar.png'; // <-- imagem local importada

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));
  const [profileImage, setProfileImage] = useState(defaultAvatar);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user);

      if (user) {
        const userData = JSON.parse(user);

        // Exemplo: carregando imagem de perfil da API (ou banco de dados)
        fetch(`https://localhost:7278/api/Usuario${userData.id}`) // Altere para o endpoint correto da sua API
          .then(res => res.json())
          .then(data => {
            if (data.profileImage) {
              setProfileImage(data.profileImage);
            } else {
              setProfileImage(defaultAvatar);
            }
          })
          .catch(() => {
            setProfileImage(defaultAvatar);
          });
      }
    };

    checkLoginStatus();

    window.addEventListener('loginStatusChanged', checkLoginStatus);
    return () => window.removeEventListener('loginStatusChanged', checkLoginStatus);
  }, []);

  const goToProfile = () => {
    navigate('/perfil');
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
            <li><a href="HomePrivate"><i className="fas fa-home"></i> Início</a></li>
            <li><a href="#">Categorias</a></li>
            <li><a href="#">PlayList</a></li>
          </ul>

          <div className="nav-right">
            <img
              src={profileImage}
              alt="Perfil"
              className="profile-avatar"
              onClick={goToProfile}
            />
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
          <li><Link to="/HomePrivate" onClick={() => setMenuOpen(false)}>Artista</Link></li>
          <li><Link to="/login" onClick={() => setMenuOpen(false)}>Entrar</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
