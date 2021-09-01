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
      
      <div class="container-img-forms">
        <div class="img-fundo"> <img src="../../img/fun.png"></div>

        <form class= "container-forms">

          <fieldset id="eye-fiel" class="fieldset-login">
            <div class="container-email-login">
              <input id= "email-login" class="email-login" placeholder="Digite seu e-mail"></input>
            </div>
            <div class="container-senha-login">
              <input id="senha" type="password" class="senha-login" placeholder="Digite sua senha"></input>
              <button type="button" class="botao-eye-login"> </button>
            </div>
          </fieldset>
          
          <p id='error-message' class="erro-login"></p>

          <p id= "reset"> <u>Esqueceu a senha?</u></p>

          <button id="btnEntrar" class="botao-entrar"> Entrar </button>

          <p class="ou"> OU </p>
          
          <button id= "google" class="botao-google"> Entrar com Google </button>
          
          <div class="entrarLogin">
            <p class="cadastro" > Não tem conta? <u class="page-cadastro" id="leva-tela-cadastro"> Cadastre-se </u></p>
          </div>

        </form>
      </div>

    `;

  const email = rootElement.querySelector('#email-login');
  const passwordLogin = rootElement.querySelector('#senha');
  const msgErro = rootElement.querySelector('#error-message');
  const btnEntrar = rootElement.querySelector('#btnEntrar');
  const googleBotao = rootElement.querySelector('#google');
  const cadastro = rootElement.querySelector('#leva-tela-cadastro');
  const btnEye = rootElement.querySelector('.botao-eye-login');
  // const resetarSenha = rootElement.querySelector('#reset');

  btnEye.addEventListener('click', () => {
    if (passwordLogin.type === 'password') {
      passwordLogin.type = 'text';
    } else {
      passwordLogin.type = 'password';
    }
  });

  // resetarSenha.addEventListener('click', (e) => {
  //   e.preventDefault();
  //   navigation('/recuperar');
  // });

  const errorFunction = (error) => {
    if (error.code === 'auth/wrong-password') {
      msgErro.innerHTML = 'Senha incorreta';
    } else if (error.code === 'auth/invalid-email') {
      msgErro.innerHTML = 'E-mail incorreto';
    } else if (error.code === 'auth/user-not-found') {
      msgErro.innerHTML = 'Usuário não encontrado';
    } else {
      msgErro.innerHTML = 'Ocorreu algum erro. Tente novamente.';
    }
  };

  btnEntrar.addEventListener('click', (e) => {
    e.preventDefault();
    existingUser(email.value, passwordLogin.value, errorFunction);
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
