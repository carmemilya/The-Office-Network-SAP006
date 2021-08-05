import { Login } from './pages/login/index.js';
import { Register } from './pages/sign-up/index.js';
import { Feed } from './pages/feed/index.js';
import { Publication } from './pages/publication/index.js';

const routeRender = () => {
  const element = document.querySelector('#root');
  const routes = {
    '/': Login,
    '/cadastro': Register,
    '/feed': Feed,
    '/new-publication': Publication,
    // '/perfil": Perfil

  };

  element.innerHTML = '';
  element.appendChild(routes[window.location.pathname]());
};

window.addEventListener('popstate', routeRender);
window.addEventListener('load', () => {
  routeRender();
});
