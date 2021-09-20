import { routeRender } from './routes/render.js';
// import { userConected } from '../src/services/index.js';
// import { navigation } from './routes/navigation.js';

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

// window.addEventListener('load', (e) => {
//     e.preventDefault();
//     userConected((user) => {
//       if (user) {
//         navigation('/feed');
//       } else {
//         navigation('/');
//       }
//     });
//   });