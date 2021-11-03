import { Login } from '../pages/login/index.js';
import { Register } from '../pages/sign-up/index.js';
import { Feed } from '../pages/feed/index.js';
import { Publication } from '../pages/publication/index.js';
import { userConected } from '../services/index.js';
import { navigation } from './navigation.js';

export const routes = {
  '/': Login,
  '/cadastro': Register,
  '/feed': Feed,
  '/add-publication': Publication
};

window.addEventListener('load', (e) => {
  e.preventDefault();
  userConected((user) => {
    if (user) {
      navigation('/feed');
    } else {
      navigation('/');
    }
  });
});
