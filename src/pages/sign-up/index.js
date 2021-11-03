import { createUser } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <header class="container-login">
      <ul class="colors">
        <li class="purple">
          <ul class="black"> 
            <li class="orange"></li>
          </ul>
        </li>
      </ul>
        <h1 class="title"> The Office Network </h1>
    </head>
    <main class="tamplete-register">
        <figure class="img-register">
            <img class="img-logo" src="../../img/logo-rede-social.png">
        </figure>

        <form class= "container-register">
          <fildset class="inputs-register"> 
            <legend class ="title-register">Cadastre-se</legend>
            <section class="inputs-name">
              <input placeholder="Digite seu nome" class="input-name-register" id="completeName" "type="text" >
              <label class="msg-erro-name"></label>
              <input placeholder="Digite seu e-mail" class= "input-form" id="emailRegister" type="text" >
              <label class="msg-erro-email"></label>
            
              <div class="div-password">
                <input placeholder="Digite uma senha" class='password-register' type="password" >
                <button type="button" class="btn-eye-register"><img class='eye-password-register' src="../../img/eye.svg"> </img></button>
              </div>
              <div class="div-password-repeat">
                <input class="password-repeat" type="password" placeholder="Digite uma senha">
                <button type="button" class="btn-eye-register"><img class='eye-password-repeat' src="../../img/eye.svg"></img></button>
              </div>
            </section>
            <p class="msg-error"></p>
                    
            <button class= "btn-register">Cadastrar</button>
            
            <div class="enter-login">
              <p class="page-login">Já tem uma conta? <button class="click-page-login"> Entre</button> </p>
            </div>
          </fildset>
        </form>
    </main>
    `;

  const completeName = rootElement.querySelector('#completeName');
  const errorName = rootElement.querySelector('.msg-erro-name');
  const emailInput = rootElement.querySelector('.input-form');
  const errorEmail = rootElement.querySelector('.msg-erro-email');
  const passwordInput = rootElement.querySelector('.password-register');
  const viewPassword = rootElement.querySelector('.eye-password-register');
  const passwordRepeat = rootElement.querySelector('.password-repeat');
  const viewPasswordRepeat = rootElement.querySelector('.eye-password-repeat');
  const errorMessage = rootElement.querySelector('.msg-error');
  const createUserButton = rootElement.querySelector('.btn-register');
  const backToLogin = rootElement.querySelector('.page-login');
  

  backToLogin.addEventListener('click', () => {
    navigation('/');
  });

  viewPasswordRepeat.addEventListener('click', () => {
    if (passwordRepeat.type === 'password') {
      passwordRepeat.type = 'text';
    } else {
      passwordRepeat.type = 'password';
    }
  });

  viewPassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });

  completeName.addEventListener('keyup', () => {
    if (completeName.value.length <= 2) {
      errorName.setAttribute('style', 'color: red');
      errorName.innerHTML = 'Nome *Insira no minimo 3 caracteres';
      completeName.setAttribute('style', 'border-color: red');
    } else {
      errorName.setAttribute('style', 'color: #F27127');
      errorName.style.display = 'none';
      completeName.setAttribute('style', 'border-color: #F27127');
    }
  });

  emailInput.addEventListener('keyup', () => {
    if (emailInput.value.length <= 2) {
      errorEmail.setAttribute('style', 'color: red');
      !/\S+@\S+\.\S+/.test(emailInput)
      errorEmail.innerHTML = 'Insira no minimo 3 caracteres';
      emailInput.setAttribute('style', 'border-color: red');
    } else {
      errorEmail.setAttribute('style', 'color: #F27127');
      errorEmail.style.display = 'none';
      emailInput.setAttribute('style', 'border-color: #F27127');
    }
  });


  createUserButton.addEventListener('click', (e) => {
    e.preventDefault();
     createUser(completeName.value, emailInput.value, passwordInput.value) 
  });
  return rootElement;
};
