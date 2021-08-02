// import { createUser } from './services/index.js';

export const Register = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <h1>Cadastre-se</h1>
  <div class= "container">
    <hr>
      <label class="completeName"><b>Nome</b></label>
      <input placeholder="Nome Completo">
      <label class="nameEmail"><b>Email</b></label>
      <input id= "email" placeholder="Digite seu e-mail"></input>
      <label class="psw"><b>Senha</b></label>
      <input id="senha" placeholder="Digite uma senha 6 digitos"></input>
      <label class="psw-repeat"><b>Repetir senha</b></label>
      <input id="senha" placeholder="Digite uma senha 6 digitos"></input>
    <hr>
      <button id= "btnCadastro">Cadastrar</button>  
   <div class="entrarLogin">
      <p>Já tem uma conta? <u class="pageLogin"> Entre</u></p>
   </div>
  </div>
  `;

  //   const completeName = document.querySelector("#completeName").value;
  // const email = document.querySelector("#nameEmail").value;
  //   const password = document.querySelector("#psw");
  //   const passwordRepeat = document.querySelector("#psw-repeat");
  //   const botaoCadastro = document.querySelector("#btnCadastro")

  // function emailValidation(field){
  //   usuario =
  //  }

  const botao = rootElement.querySelector('.pageLogin');
  botao.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    const popstateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popstateEvent);
  });
  return rootElement;
};
