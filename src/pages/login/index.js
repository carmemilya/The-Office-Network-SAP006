import { signInGoogle, existingUser } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <div class="container-login">
      <div class="purple">
        <div class="black"> 
          <div class="orange"></div>
        </div>
      </div>

        <h1 class="title"> The Office Network </h1>

      <div class="tamplete-login">
        <div class="container-img-forms">
          <img class="img-fundo" src="../../img/fun.png">
        </div>

        <form class= "container-forms">
          <div class="inputs">
            <h2 class="title-login">Conecte-se</h2>
            <div class"input-box">
                <input id= "email-login" class="email-login" placeholder="Digite seu e-mail"></input>
                
              <div class="container-password-login">
                  <input id="password" type="password" placeholder="Digite sua senha" class="password-login" ></input>
                  <img type="button" class="btn-eye-login" src= "../../img/eye.svg"> </img>
              </div>
            </div>
            
            <p id='error-message' class="erro-login"></p>

            <button id="btnEnter" class="btn-enter">Entrar</button>
            <p class="another-option">OU</p>
            <button id= "google" class="btn-google"><img class="logo-google" src="../../img/google-logo.svg">Entrar com Google</button>
            
            <div class="enter-login">
              <p class="register-msg"> Não tem conta? <u class="page-register" id="route-register"> Cadastre-se</u> </p>
            </div>
          </div>
        </form>
        
      </div>
    </div>
  `;

  const email = rootElement.querySelector('#email-login');
  const passwordLogin = rootElement.querySelector('#password');
  const msgErro = rootElement.querySelector('#error-message');
  const btnEnter = rootElement.querySelector('#btnEnter');
  const googleBtn = rootElement.querySelector('#google');
  const registerRoute = rootElement.querySelector('#route-register');
  const btnEye = rootElement.querySelector('.btn-eye-login');

  btnEye.addEventListener('click', () => {
    if (passwordLogin.type === 'password') {
      passwordLogin.type = 'text';
    } else {
      passwordLogin.type = 'password';
    }
  });

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

  btnEnter.addEventListener('click', (e) => {
    e.preventDefault();
    existingUser(email.value, passwordLogin.value, errorFunction);
  });

  googleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle().then(() => navigation('/feed'));
  });

  registerRoute.addEventListener('click', (e) => {
    e.preventDefault();
    navigation('/cadastro');
  });
  return rootElement;
};
