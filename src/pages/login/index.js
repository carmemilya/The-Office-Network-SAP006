import { signInGoogle, existingUser } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `

    <div class="roxa">
      <div class="preto"> 
        <div class="laranja"></div>
      </div>
    </div>
    <h1 class="titulo"> The Office Network </h1>

    <form class= "container">

      <fieldset id="eye-fiel" class="eye">
        <input id= "email-login" class="email" placeholder="Digite seu e-mail"></input>
        <input id="senha" type="password" class="senha" placeholder="Digite sua senha"></input>
        <button type="button" class="botao-eye"> </button>
      </fieldset>
  
      
        <p id='error-message' class="erro"></p>

        <p id= "reset"> <u>Esqueceu a senha?</u></p>

        <button id="btnEntrar" class="botao-entrar"> Entrar </button>

        <p class="ou"> OU </p>
      
        <button id= "google" class="botao-google"> Entrar com Google </button>
      
     <div class="entrarLogin">
        <p class="cadastro" > Não tem conta? <u class="page-cadastro" id="leva-tela-cadastro"> Cadastre-se </u></p>
     </div>
    </form>

    `;

  const email = rootElement.querySelector('#email-login');
  const password = rootElement.querySelector('#senha');
  const msgErro = rootElement.querySelector('#error-message');
  const btnEntrar = rootElement.querySelector('#btnEntrar');
  const googleBotao = rootElement.querySelector('#google');
  const cadastro = rootElement.querySelector('#leva-tela-cadastro');

  const errorFunction = (error) => {
    if (error.code === 'auth/wrong-password') {
      msgErro.innerHTML = 'Senha incorreta';
    } else if (error.code === 'auth/invalid-email') {
      msgErro.innerHTML = 'E-mail incorreto';
    } else {
      msgErro.innerHTML = 'Usuário não encontrado';
    }
  };

  btnEntrar.addEventListener('click', (e) => {
    e.preventDefault();
    existingUser(email.value, password.value, errorFunction);
  });

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
