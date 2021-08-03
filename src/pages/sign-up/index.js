import { createUser } from '../../services/index.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <h1>Cadastre-se</h1>
      <form class= "container">
        <hr>
          <label class="UserName"><b>Nome</b></label>
          <input class="completeName" ="type="text" placeholder="Nome Completo">

          <label class="nameEmail"><b>Email</b></label>
          <input class= "email" type="text" placeholder="Digite seu e-mail"></input>
          

          <div class="psw"><b>Senha</b></div>
          <input class="senha" type="password" placeholder="Digite uma senha 6 digitos"></input>
          
          <label class="psw-repeat"><b>Repetir senha</b></label>
          <input class="repeatPassword" type="password" placeholder="Digite uma senha 6 digitos"></input>
          <label class="msgPassword"></label>
        <hr>
      
          <button class= "btnCadastro">Cadastrar</button>
      
          <div class="entrarLogin">
           <p>Já tem uma conta?<a class="pageLogin"> Entre</a></p>
          </div>
      </form>

    `;
  const completeName = rootElement.querySelector('.completeName');
  const emailInput = rootElement.querySelector('.email');
  const passwordInput = rootElement.querySelector('.senha');
  const passwordRepeat = rootElement.querySelector('.repeatPassword');
  const passwordMessage = rootElement.querySelector('.msgPassword');
  const createUserButton = rootElement.querySelector('.btnCadastro');
  const botao = rootElement.querySelector('.pageLogin');

  botao.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    const popstateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popstateEvent);
  });

  createUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    const userName = completeName.value;
    const emailUser = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = passwordRepeat.value;

    if (userName === '' || emailUser === '' || password === '' || confirmPassword === '') {
      passwordMessage.innerHTML = 'Todos os campos devem ser preenchidos';
    }
    if (password.length < 6 || confirmPassword.length < 6) {
      passwordMessage.innerHTML = 'A senha deve ter no minimo 6 caracteres';
    }
    if (password !== confirmPassword) {
      passwordMessage.innerHTML = 'As senhas devem ser iguais';
    } else {
      createUser(emailUser, password);
    }
  });
  return rootElement;
};
