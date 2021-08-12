import { signInGoogle, existingUser /* resetarSenha */ } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <h1>The Office Network</h1>
    <form class= "container">
      <hr>
        <input id= "email-login" placeholder="Digite seu e-mail"></input>
        <input id="senha" type="password" placeholder="Digite sua senha"></input>
        <p id='error-message'></p>

        <p id= "reset"> <u>Esqueceu a senha?</u></p>

        <button id="btnEntrar">Entrar</button>

        <p>OU</p>
      <hr>

        <button id= "google">Entrar com a conta Google</button>
    
     <div class="entrarLogin">
        <p>Não tem conta? <u class="pageCadastro" id="leva-tela-cadastro">Cadastre-se</u></p>
     </div>
    </form>

    `;

  const email = rootElement.querySelector('#email-login');
  const password = rootElement.querySelector('#senha');
  const msgErro = rootElement.querySelector('#error-message');
  const btnEntrar = rootElement.querySelector('#btnEntrar');
  // const trocarSenha = rootElement.querySelector('#reset');
  const googleBotao = rootElement.querySelector('#google');
  const cadastro = rootElement.querySelector('#leva-tela-cadastro');

  const errorFunction = (error) => {
    if (error.code === 'auth/wrong-password') {
      msgErro.innerHTML = 'Senha incorreta';
    } else if (error.code === 'auth/invalid-email') {
      msgErro.innerHTML = 'E-mail incorreto';
    }
  };

  btnEntrar.addEventListener('click', (e) => {
    e.preventDefault();
    existingUser(email.value, password.value, errorFunction);
  });

  // resetarSenha.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   resetarSenha().then(() => navigation('/'));
  // });

  googleBotao.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle().then(() => navigation('/feed'));
  });

  cadastro.addEventListener('click', (e) => {
    e.preventDefault();
    navigation('/cadastro');
  });
  return rootElement;
};
