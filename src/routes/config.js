import { Login } from '../pages/login/index.js';
import { Register } from '../pages/sign-up/index.js';
import { Feed } from '../pages/feed/index.js';
import { Publication } from '../pages/publication/index.js';

export const routes = {
  '/': Login,
  '/cadastro': Register,
  '/feed': Feed,
  '/add-publication': Publication,
  // '/perfil": Perfil
};