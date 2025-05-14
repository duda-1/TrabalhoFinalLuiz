import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaCheck,FaArrowRight } from 'react-icons/fa';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotUsername, setForgotUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetResponse, setResetResponse] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.username || !formData.password) {
      setErrorMessage('Por favor, preencha todos os campos.');
      return;
    }

    const requestBody = {
      Nome: formData.username,
      Senha: formData.password,
    };

    try {
      const response = await fetch('https://localhost:7278/api/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        window.dispatchEvent(new Event('loginStatusChanged'));
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccessMessage('Login realizado com sucesso! Redirecionando...');
        setTimeout(() => navigate('/homeprivate'), 1500);
      } else {
        setErrorMessage(data.error || data.message || 'Erro ao fazer login.');
      }
    } catch (error) {
      setErrorMessage('Erro de conexão com o servidor.');
    }
  };

  const handleResetPassword = async () => {
    if (!forgotUsername.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setResetResponse('Por favor, preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetResponse('As senhas não coincidem.');
      return;
    }

    const requestBody = { NovaSenha: newPassword };

    try {
      const response = await fetch(`https://localhost:7278/api/Usuario/RedefinirSenhaPorNome/${forgotUsername}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (response.ok) {
        setResetResponse('Senha redefinida com sucesso!');
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotUsername('');
          setNewPassword('');
          setConfirmPassword('');
          setResetResponse('');
        }, 2000);
      } else {
        setResetResponse(data.error || data.message || 'Erro ao redefinir a senha.');
      }
    } catch (error) {
      setResetResponse('Erro de conexão com o servidor.');
    }
  };

 const goToRegister = () => {
  const panel = document.getElementById('leftPanel');

  if (panel) {
    panel.classList.add('expandir-e-cobrir-esquerda');
    setTimeout(() => navigate('/cadastro'), 1000);
  } else {
    navigate('/cadastro');
  }
};


  return (
   <div className="fullpage">
        <button className="botao-cadastro-mobile-topo" onClick={goToRegister}>
      <FaArrowRight />
    </button>
  <div className="left-panel" id="leftPanel">

    <h2>Bem-vindo de Volta!</h2>
    <p>Não tem uma conta? Cadastre-se já!</p>
    <button onClick={goToRegister}>Cadastro</button>
  </div>

      <div className="right-panel full-width">
        <h2 className="log">Login</h2><br/>

        {errorMessage && <div className="mensagem-erro">{errorMessage}</div>}
        {successMessage && <div className="mensagem-sucesso">{successMessage}</div>}

        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <span><FaUser /></span>
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <span><FaLock /></span>
        </div>

        <p className="forgot-password-link" onClick={() => setShowForgotPassword(!showForgotPassword)}>
          Esqueceu a Senha?
        </p>

        <button className="login-btn" onClick={handleLogin}>Login</button>

        {showForgotPassword && (
          <div className="forgot-password-modal">
            <h3>Redefinir Senha</h3>

            <div className="input-group">
              <input
                type="text"
                placeholder="Digite seu nome de usuário"
                value={forgotUsername}
                onChange={(e) => setForgotUsername(e.target.value)}
              />
              <span><FaUser /></span>
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Nova senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <span><FaLock /></span>
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span><FaCheck /></span>
            </div>

            <button onClick={handleResetPassword}>Redefinir Senha</button>
            {resetResponse && <p className="forgot-response">{resetResponse}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
