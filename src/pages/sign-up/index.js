import { createUser, creatFormUser } from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      
      <fieldset class="tamplete-register">
      <legend>Cadastre-se</legend>
        <form class= "container-register">
          
            <label class="UserName"><b>Nome</b></label>
            <input class="completeName" ="type="text" placeholder="Nome Completo">

            <label class="nameEmail"><b>Email</b></label>
            <input class= "email" type="text" placeholder="Digite seu e-mail">
            

            <div class="psw"><b>Senha</b></div>
            <div>
            <input class='passwordRegister' type="password" placeholder="Digite uma senha 6 digitos">
            <img class='eye' src='https://image.flaticon.com/icons/png/512/149/149642.png'>
            </div>

            <label class="psw-repeat"><b>Repetir senha</b></label>
            <div>
            <input class="repeatPassword" type="password" placeholder="Digite uma senha 6 digitos">
            <img class='eyeRepeat' src='https://image.flaticon.com/icons/png/512/149/149642.png'>
            </div>
            <label class="msgPassword"></label>
          
          
            <button class= "btnCadastro">Cadastrar</button>
          
            <div class="entrarLogin">
            <p>Já tem uma conta?<a class="pageLogin"> Entre</a></p>
            </div>
        </form>
      </fieldset>
    `;
  const completeName = rootElement.querySelector('.completeName');
  const emailInput = rootElement.querySelector('.email');
  const passwordInput = rootElement.querySelector('.passwordRegister');
  const viewPassword = rootElement.querySelector('.eye');
  const passwordRepeat = rootElement.querySelector('.repeatPassword');
  const viewPasswordRepeat = rootElement.querySelector('.eyeRepeat');
  const passwordMessage = rootElement.querySelector('.msgPassword');
  const createUserButton = rootElement.querySelector('.btnCadastro');
  const botao = rootElement.querySelector('.pageLogin');

  botao.addEventListener('click', () => {
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

  createUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    const userName = completeName.value;
    const emailUser = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = passwordRepeat.value;

    if (userName === '' || emailUser === '' || password === '' || confirmPassword === '') {
      passwordMessage.innerHTML = 'Todos os campos devem ser preenchidos';
    } else if (password !== confirmPassword) {
      passwordMessage.innerHTML = 'As senhas devem ser iguais';
    } else if (password.length <= 5 || confirmPassword.length <= 5) {
      passwordMessage.innerHTML = 'A senha deve ter no minimo 6 caracteres';
    } else {
      createUser(emailUser, password);
      creatFormUser(userName, emailUser);
      navigation('/feed');
    }
  });

  return rootElement;
};
