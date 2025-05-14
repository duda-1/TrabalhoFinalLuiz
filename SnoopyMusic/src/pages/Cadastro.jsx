import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaImage, FaArrowLeft } from 'react-icons/fa'; // Adiciona FaArrowLeft

import './Cadastro.css';

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
    imgUrl: '',
  });

  const [mensagemSucesso, setMensagemSucesso] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');
  const [erroSenha, setErroSenha] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'confirmSenha' || name === 'senha') {
      setErroSenha(false);
      setMensagemErro('');
    }
  };

  const handleSubmit = async () => {
    setMensagemSucesso('');
    setMensagemErro('');

    if (formData.senha !== formData.confirmSenha) {
      setErroSenha(true);
      setMensagemErro('As senhas não coincidem!');
      return;
    }

    const requestBody = {
      Nome: formData.nome,
      Email: formData.email,
      Senha: formData.senha,
      ImgUrl: formData.imgUrl || null,
    };

    try {
      const response = await fetch('https://localhost:7278/api/Usuario/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagemSucesso('Usuário cadastrado com sucesso!');
        setFormData({ nome: '', email: '', senha: '', confirmSenha: '', imgUrl: '' });
      } else {
        setMensagemErro(data.error || data.message || 'Erro ao registrar.');
      }
    } catch (error) {
      setMensagemErro('Erro ao conectar com o servidor.');
    }
  };

  const irParaLogin = () => {
    const painel = document.getElementById('painelRedirectCadastro');
    painel.classList.add('expandir-e-cobrir');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  return (
    <div className="container-cadastro">
      <button className="botao-login-mobile-topo" onClick={irParaLogin}>
      <FaArrowLeft />
      </button>
      <div className="painel-redirect-cadastro" id="painelRedirectCadastro">
      <h2>Olá, bem-vindo!</h2>
      <p>Já possui uma conta? Acesse sua conta aqui.</p>
      <button className="botao-login-mobile" onClick={irParaLogin}>Login</button>
    </div>


      <div className="painel-formulario-cadastro">
        <h2 className="titulo-cadastro">Cadastro</h2><br/>

        {mensagemErro && <div className="mensagem-erro">{mensagemErro}</div>}
        {mensagemSucesso && <div className="mensagem-sucesso">{mensagemSucesso}</div>}

        <div className="grupo-input">
          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
          <span className="icon"><FaUser /></span>
        </div>

        <div className="grupo-input">
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <span className="icon"><FaEnvelope /></span>
        </div>

        <div className={`grupo-input ${erroSenha ? 'input-erro' : ''}`}>
          <input type="password" name="senha" placeholder="Senha" value={formData.senha} onChange={handleChange} />
          <span className="icon"><FaLock /></span>
        </div>

        <div className={`grupo-input ${erroSenha ? 'input-erro' : ''}`}>
          <input type="password" name="confirmSenha" placeholder="Confirmar Senha" value={formData.confirmSenha} onChange={handleChange} />
          <span className="icon"><FaLock /></span>
        </div>

        <label className="label-url">Imagem de Perfil (URL opcional):</label>
        <div className="grupo-input">
          <input type="text" name="imgUrl" placeholder="Cole a URL da imagem" value={formData.imgUrl} onChange={handleChange} />
          <span className="icon"><FaImage /></span>
        </div><br/>

        <button className="botao-cadastrar" onClick={handleSubmit}>Register</button>

        <p className="texto-login-mobile">
        Já possui uma conta? <a href="/login">Faça já o login</a>
      </p>

      </div>
    </div>
  );
}
