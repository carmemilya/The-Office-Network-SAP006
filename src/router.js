import { Login } from './pages/login/index.js';
import { Register } from './pages/sign-up/index.js';
import { Feed } from './pages/feed/index.js';

const routeRender = () => {
  const element = document.querySelector('#root');
  const routes = {
    '/': Login,
    '/cadastro': Register,
    '/feed': Feed,
    // '/publicacao": Publicar
    // '/perfil": Perfil

  };

  element.innerHTML = '';
  element.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  routeRender();
});
