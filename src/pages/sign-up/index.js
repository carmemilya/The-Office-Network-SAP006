import { createUser } from '../../services/index.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      
      <fieldset>
      <legend>Cadastre-se</legend>
        <form class= "container">
          
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
    if (password !== confirmPassword) {
      passwordMessage.innerHTML = 'As senhas devem ser iguais';
    }
    if (userName === '' || emailUser === '' || password === '' || confirmPassword === '') {
      passwordMessage.innerHTML = 'Todos os campos devem ser preenchidos';
    }
    if (password.length < 6 || confirmPassword.length < 6) {
      passwordMessage.innerHTML = 'A senha deve ter no minimo 6 caracteres';
    } else {
      window.history.pushState({}, '', '/feed');
      const popstateEvent = new PopStateEvent('popstate', { state: {} });
      dispatchEvent(popstateEvent);
      createUser(emailUser, password);
    }
  });

  botao.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    const popstateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popstateEvent);
  });
  return rootElement;
};
