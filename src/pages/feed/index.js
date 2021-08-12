import { navigation } from '../../routes/navigation.js';
import { signOut } from '../../services/index.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <h1>The Office Network</h1>
      <div class= "container">
        <hr>
            <p>FEED DE NOTICIAS TEY TEY ffffff</p>
        <hr>
      
       <div class="entrarLogin">
          <p id="sair-da-conta" class="sair">SAINDO COM ARROZ</p>
       </div>
      </div>
  
      `;
  // Acho que tá funcionando kkkcrying
  const sair = rootElement.querySelector('#sair-da-conta');
  sair.addEventListener('click', (e) => {
    e.preventDefault();
    signOut().then(() => navigation('/'));
  });
  return rootElement;
};
