import { Login } from '../pages/login/index.js';
import { Register } from '../pages/sign-up/index.js';
import { Feed } from '../pages/feed/index.js';
import { mantemConectado } from '../services/index.js';
import { navigation } from './navigation.js';

export const routes = {
  '/': Login,
  '/cadastro': Register,
  '/feed': Feed,
  // '/publicacao": Publicar
  // '/perfil": Perfil
};

window.addEventListener('load', (e) => {
  e.preventDefault();
  mantemConectado((user) => {
    if (user) {
      navigation('/feed');
    } else {
      navigation('/');
    }
  });
});
