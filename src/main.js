// anotações de codigo (não vamos usar o main por enquanto)
import { routeRender } from './routes/render.js';

window.addEventListener('popstate', routeRender);
window.addEventListener('load', routeRender);
