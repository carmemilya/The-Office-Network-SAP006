// import {createUser} from "./pages/services/index.js"
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
        <button id= "cadatroGoogle">Cadastrar com a conta Google</button>
    
     <div class="entrarLogin">
        <p>Já tem uma conta?<a href="login" class="pageLogin"> Entre</a></p>
     </div>
    </div>

    `;
  return rootElement;
};

// export const registrerUser = () =>{
//     const email = document.querySelector("#nameEmail");
//     const password = document.querySelector("#psw");
//     createUser(email.value, password.value)
// }

// btnCadastro.addEventListener("click", registrerUser)

// const botao = rootElement.querySelector("#pageLogin");
// botao.addEventListener("click", () => {
//     window.history.pushState({}, "", "/Login");
//     const popstateEvent = new PopStateEvent("popstate", {state:{}});
//     dispatchEvent(popstateEvent);
// })
