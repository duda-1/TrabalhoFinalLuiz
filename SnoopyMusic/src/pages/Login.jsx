import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // seu CSS adaptado

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotUsername, setForgotUsername] = useState('');
  const [forgotResponse, setForgotResponse] = useState('');

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Usuário logado com sucesso!', data);
        window.dispatchEvent(new Event('loginStatusChanged'));
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccessMessage('Login realizado com sucesso! Redirecionando...');

        setTimeout(() => {
          navigate('/homeprivate');
        }, 1500); // espera 1.5 segundos para redirecionar
      } else {
        setErrorMessage(data.error || data.message || 'Erro ao fazer login.');
      }
    } catch (error) {
      console.error('Erro ao conectar:', error);
      setErrorMessage('Erro de conexão com o servidor.');
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotUsername.trim()) {
      setForgotResponse('Por favor, informe seu nome de usuário.');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7278/api/Usuario/${forgotUsername}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        setForgotResponse('Usuário encontrado! Verifique seu e-mail para redefinir a senha.');
      } else {
        setForgotResponse(data.error || data.message || 'Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao conectar:', error);
      setForgotResponse('Erro de conexão com o servidor.');
    }
  };

  const goToRegister = () => {
    const panel = document.getElementById('leftPanel');
    const fullpage = document.querySelector('.fullpage');
    
    if (panel) {
      panel.classList.add('slide-right'); // Inicia a animação do painel
      fullpage.classList.add('slide'); // Aplica a animação de fundo
      setTimeout(() => {
        navigate('/cadastro'); // Redireciona para a página de cadastro após a animação
      }, 1000); // Espera 1 segundo para completar a animação
    } else {
      navigate('/cadastro'); // Se o painel não existir, apenas navega
    }
  };

  return (
    <div className="fullpage">
      <div className="left-panel" id="leftPanel">
        <h2>Hello, Welcome!</h2>
        <p>Don't have an account?</p>
        <button onClick={goToRegister}>Cadastro</button>
      </div>

      <div className="right-panel full-width">
        <h2 className="log">Login</h2>

        {errorMessage && (
          <div className="mensagem-erro">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="mensagem-sucesso">{successMessage}</div>
        )}

        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <p 
          className="forgot-password-link" 
          onClick={() => setShowForgotPassword(!showForgotPassword)}
        >
          Forgot Password?
        </p>

        <button className="login-btn" onClick={handleLogin}>Login</button>

        {showForgotPassword && (
          <div className="forgot-password-modal">
            <input
              type="text"
              placeholder="Digite seu username"
              value={forgotUsername}
              onChange={(e) => setForgotUsername(e.target.value)}
            />
            <button onClick={handleForgotPassword}>Recuperar Senha</button>
            {forgotResponse && <p className="forgot-response">{forgotResponse}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
