import React, { useState, useEffect } from 'react';
import './Perfil.css';

const Perfil = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        setError('Usuário não autenticado');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://localhost:7278/api/Usuario/${userId}`);
        if (!response.ok) {
          throw new Error('Erro ao carregar o usuário');
        }

        const data = await response.json();
        setUsername(data.nome);
        setEmail(data.email);
        setPhotoUrl(data.img_url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  if (loading) return <div className="main"><p>Carregando...</p></div>;
  if (error) return <div className="main"><p>Erro: {error}</p></div>;

  return (
    <div className='main'>
      <div className="profile-container">
        <h2>Seu Perfil</h2>

        <div className="profile-field">
          <img src={photoUrl} alt="Foto de perfil" className="profile-photo" />
          {isEditingPhoto ? (
            <input
              type="text"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              onBlur={() => setIsEditingPhoto(false)}
            />
          ) : (
            <i className="fas fa-pencil-alt" onClick={() => setIsEditingPhoto(true)}></i>
          )}
        </div>

        <div className="profile-field">
          <label>Nome de usuário:</label>
          {isEditingName ? (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setIsEditingName(false)}
            />
          ) : (
            <>
              <span>{username}</span>
              <i className="fas fa-pencil-alt" onClick={() => setIsEditingName(true)}></i>
            </>
          )}
        </div>

        <div className="profile-field">
          <label>Email:</label>
          <span>{email}</span>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
