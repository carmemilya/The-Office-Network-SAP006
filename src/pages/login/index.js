import { signInGoogle } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <h1>The Office Network</h1>
    <div class= "container">
      <hr>
        <input id= "email-login" placeholder="Digite seu e-mail"></input>
        <input id="senha" type="password" placeholder="Digite sua senha"></input>
        <p id= "reset"> <u>Esqueceu a senha?</u></p>
        <button id="btnEntrar">Entrar</button>
        <p>OU</p>
      <hr>

        <button id= "google">Entrar com a conta Google</button>
    
     <div class="entrarLogin">
        <p>Não tem conta? <u class="pageCadastro" id="leva-tela-cadastro">Cadastre-se</u></p>
     </div>
    </div>

    `;

  const btnEntrar = rootElement.querySelector('#btnEntrar');
  // const resetarSenha = rootElement.querySelector('#reset');
  const googleBotao = rootElement.querySelector('#google');
  const cadastro = rootElement.querySelector('#leva-tela-cadastro');

  btnEntrar.addEventListener('click', () => {
    navigation('/feed');
  });

  googleBotao.addEventListener('click', () => {
    signInGoogle().then(() => navigation('/feed'));
  });

  cadastro.addEventListener('click', () => {
    navigation('/cadastro');
  });
  return rootElement;
};
