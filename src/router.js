// COLOCAR AS ROTAS DO SITE
// COMO VAI ABRIR
import { Register } from "./pages/signup/index.js"

const routRender = () =>{
  const elemento = document.querySelector('#root');
  const routes = {
    //"/":Login
    "/Cadastro":Register
  },
  elemento.innerHTML = "";
  elemento.appendChild(routes[window.location.pathname]())
}
window.addEventListener("popstate", routRender);
window.addEventListener('load', () => {
  routRender();
});