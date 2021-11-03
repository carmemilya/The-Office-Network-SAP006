import { routeRender } from './routes/render.js';

window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender, (e) => {
    e.preventDefault();
    userConected((user) => {
      if (user) {
        navigation('/feed');
      } else {
        navigation('/');
      }
    });
});
