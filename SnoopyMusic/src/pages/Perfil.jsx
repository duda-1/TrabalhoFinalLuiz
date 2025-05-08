import React, { useState } from 'react';
import './Perfil.css';

const Perfil = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);

  const [username, setUsername] = useState('usuario123');
  const [password, setPassword] = useState('senhaSecreta');
  const [photoUrl, setPhotoUrl] = useState('https://i.pravatar.cc/150?img=3');

  return (
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
        <label>Senha:</label>
        {isEditingPassword ? (
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setIsEditingPassword(false)}
          />
        ) : (
          <>
            <span>{'*'.repeat(password.length)}</span>
            <i className="fas fa-pencil-alt" onClick={() => setIsEditingPassword(true)}></i>
          </>
        )}
      </div>
    </div>
  );
};

export default Perfil;