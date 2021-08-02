import { signInGoogle, usuarioExistente } from '../../services/index.js';
export const Login = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <h1>The Office Network</h1>
    <div class= "container">
      <hr>
        <input id= "email-login" placeholder="Digite seu e-mail"></input>
        <input id="senha-login" placeholder="Digite sua senha"></input>
        <p>Esqueceu a senha?</p>
        <button id="btnEntrar">Entrar</button>
        <p>OU</p>
      <hr>

        <button id= "google">Entrar com a conta Google</button>
    
     <div class="entrarLogin">
        <p>Não tem conta? <u class="pageCadastro" id="leva-tela-cadastro">Cadastre-se</u></p>
     </div>
    </div>

    `;

  const btnEntrar = rootElement.querySelector('#btnEntrar');
  const googleBotao = rootElement.querySelector('#google');
  const cadastro = rootElement.querySelector('#leva-tela-cadastro');

  btnEntrar.addEventListener('click', () => {
    window.history.pushState({}, '', '/feed');
    const popstateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popstateEvent);
  });

  cadastro.addEventListener('click', () => {
    window.history.pushState({}, '', '/cadastro');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });

  googleBotao.addEventListener('click', () => {
    signInGoogle();
  });
  return rootElement;
};
