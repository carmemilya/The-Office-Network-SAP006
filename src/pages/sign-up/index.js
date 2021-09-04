import { createUser, creatFormUser } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <div class='tamplete-register'>
        <div class="img-register">
            <img class="img-logo" src="../../img/fun.png">
        </div>

        <form class= "container-register">
          <div class="inputs"> 
            <h1 class ="title-register">Cadastre-se</h1>
            <div class="inputs-name">
              <input class="input-form" id="completeName" ="type="text" placeholder="Nome Completo">
              <input class= "input-form" id="emailRegister" type="email" placeholder="Digite seu e-mail">
            
              <div class="div-password">
                <input class='password-register' type="password" placeholder="Digite uma senha 6 digitos">
                <button type="button" class='eye-password-register'>
              </div>
              <div class="div-password-repeat">
                <input class="password-repeat" type="password" placeholder="Digite uma senha 6 digitos">
                <button type="button" class='eye-password-repeat'> </button>
              </div>
            </div>
            <p class="msg-error"></p>
            <p class="msg-erro-firebase"></p>
                    
            <button class= "btn-register">Cadastrar</button>
            
            <div class="enter-login">
              <p class="page-login">Já tem uma conta? <u class="page-login"> Entre</u> </p>
            </div>
          </div>
        </form>
      </div>
    `;

  const completeName = rootElement.querySelector('#completeName');
  const emailInput = rootElement.querySelector('#emailRegister');
  const passwordInput = rootElement.querySelector('.password-register');
  const viewPassword = rootElement.querySelector('.eye-password-register');
  const passwordRepeat = rootElement.querySelector('.password-repeat');
  const viewPasswordRepeat = rootElement.querySelector('.eye-password-repeat');
  const errorMessage = rootElement.querySelector('.msg-error');
  const erroFirebase = rootElement.querySelector('.msg-erro-firebase');
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

  const errorFunction = (error) => {
    if (error.code === 'auth/uid-already-exists') {
      erroFirebase.innerHTML = 'E-mail já existe';
    } else if (error.code === 'auth/email-already-in-use') {
      erroFirebase.innerHTML = 'E-mail já cadastrado';
    } else if (error.code === 'auth/invalid-email') {
      erroFirebase.innerHTML = 'E-mail invalido';
    } else if (error.code === 'auth/invalid-password') {
      erroFirebase.innerHTML = 'Senha inválida';
    } else {
      erroFirebase.innerHTML = 'Ocorreu algum erro. Tente novamente.';
    }
  };

  createUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    const userName = completeName.value;
    const emailUser = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = passwordRepeat.value;

    if (userName === '' || emailUser === '' || password === '' || confirmPassword === '') {
      errorMessage.innerHTML = 'Todos os campos devem ser preenchidos';
    } else if (password !== confirmPassword) {
      errorMessage.innerHTML = 'As senhas devem ser iguais';
    }

    createUser(emailUser, password, errorFunction).then((response) => {
      console.log(response);
      const userId = firebase.auth().currentUser.uid;
      creatFormUser(userId, userName, emailUser);
    })
      .catch((response) => {
        console.log(response);
      });
  });
  return rootElement;
};
