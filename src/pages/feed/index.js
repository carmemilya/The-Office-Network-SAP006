import { navigation } from '../../routes/navigation.js';
import { signOut } from '../../services/index.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <h1>The Office Network</h1>
      <div class= "container">
        <hr>
            <p>FEED DE NOTICIAS TEY TEY</p>
        <hr>
      
       <div class="entrarLogin">
          <p class="sair">SAIR</p>
       </div>
      </div>
  
      `;
  // Acho que tá funcionando kkkcrying
  const sair = rootElement.querySelector('.sair');
  sair.addEventListener('click', () => {
    signOut().then(() => navigation('/'));
  });
  return rootElement;
};
