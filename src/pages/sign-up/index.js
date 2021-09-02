import { createUser, creatFormUser } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      
        <form class= "container-register">

          <div class="img-tela-cadastro">
             <img class="img-cadastro" src="../../img/fun.png">
          </div>

          <div class="inputs"> 
            <h1 class="cadastre-se">Cadastre-se</h1>
            <div class="name-email-cadastro">
              <input class="complete-name" ="type="text" placeholder="Nome Completo">
              <input class= "email-cadastro" type="text" placeholder="Digite seu e-mail">
            </div>
            
            <div class="senha-cadastro">
              <input class='password-register' type="password" placeholder="Digite uma senha 6 digitos">
              <button type="button" class='eye-senha-cadastro'>
            </div>

            <div class="senha-cadastro-repeat">
              <input class="password-repeat" type="password" placeholder="Digite uma senha 6 digitos">
              <button type="button" class='eye-senha-repeat'> </button>
            </div>

            <p class="msg-error"></p>
            <p class="msg-erro-firebase"></p>
                    
            <button class= "btn-cadastro">Cadastrar</button>
            
            <div class="entrar-login">
              <p>Já tem uma conta?<a class="page-login"> Entre</a></p>
            </div>
          </div>
        </form>
      
    `;

  const completeName = rootElement.querySelector('.complete-name');
  const emailInput = rootElement.querySelector('.email-cadastro');
  const passwordInput = rootElement.querySelector('.password-register');
  const viewPassword = rootElement.querySelector('.eye-senha-cadastro');
  const passwordRepeat = rootElement.querySelector('.password-repeat');
  const viewPasswordRepeat = rootElement.querySelector('.eye-senha-repeat');
  const errorMessage = rootElement.querySelector('.msg-error');
  const erroFirebase = rootElement.querySelector('.msg-erro-firebase');
  const createUserButton = rootElement.querySelector('.btn-cadastro');
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
    if (error.code === 'auth/email-already-exists') {
      erroFirebase.innerHTML = 'E-mail já existe';
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
    createUser();

    if (userName === '' || emailUser === '' || password === '' || confirmPassword === '') {
      errorMessage.innerHTML = 'Todos os campos devem ser preenchidos';
    } else if (password !== confirmPassword) {
      errorMessage.innerHTML = 'As senhas devem ser iguais';
    }

    createUser(emailUser, password).then((user) => {
      const userId = firebase.auth().currentUser.uid;
      creatFormUser(userId, userName, emailUser, errorFunction);
    });
  });
  return rootElement;
};
