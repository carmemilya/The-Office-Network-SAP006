import { signInGoogle, existingUser } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Login = () => {
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
    </header>

    <main class="tamplete-login">
      <figure class="container-img-forms">
        <img class="img-logo-login" src="../../img/logo-rede-social.png">
      </figure>

      <form class= "container-forms">
        <fieldset class="inputs">
          <legend class="title-login">Conecte-se</legend>
          <section class"input-box">
            <input id="email-login" class="email-login" placeholder="Digite seu e-mail"></input>
              
            <div class="container-password-login">
                <input id="password" type="password" placeholder="Digite sua senha" class="password-login" ></input>
                <button type="button"class="btn-eye-login" ><img class="img-eye-login" src= "../../img/eye.svg"></img></button>
            </div>
          </section>
          
          <p id='error-message' class="erro-login"></p>

          <button id="btnEnter" class="btn-enter">Entrar</button>
          <p class="another-option">OU</p>
          <button type='button' id= "google" class="btn-google"><img class="logo-google" src="../../img/google-logo.svg">Entrar com Google</button>
          
          <div class="enter-register">
            <p class="register-msg"> Não tem conta?<button class="page-register" id="route-register"> Cadastre-se</button></p>  
          </div>
        </fildset>
      </form>
        
    </main>
  `;

  const emailLogin = rootElement.querySelector('#email-login');
  const passwordLogin = rootElement.querySelector('.password-login');
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

  
  btnEnter.addEventListener('click', (e) => {
    e.preventDefault();
    const emailUser = emailLogin.value;
    console.log(emailUser)
    const password = passwordLogin.value;

    if (emailUser === '' || password === '') {
      msgErro.innerHTML = 'Todos os campos devem ser preenchidos';
    } 
    else if (!/\S+@\S+\.\S+/.test(emailUser)){
      msgErro.innerHTML = 'Formato de e-mail incorreto'
      
    }
    else if (password.length < 6){
      msgErro.innerHTML = 'A senha deve conter no mínimo 6 caracteres'
    }
    else {
      existingUser(emailUser, password);
    }
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
