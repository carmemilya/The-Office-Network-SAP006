import { routes } from './config.js';

export const routeRender = () => {
  const element = document.querySelector('#root');
  element.innerHTML = '';
  element.appendChild(routes[window.location.pathname]());
};
