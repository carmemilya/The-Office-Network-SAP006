import { navigation } from '../../routes/navigation.js';
import { addPublication } from '../../services/index.js';

//  import { navigation } from
export const Publication = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `

    <img class= "img-logo-page" src="../../img/fun.png">
      <div class= "container-publication">
        <h1 class="title-text">Compartilhe aqui suas experiencias com outros colaboradores</h1>

        <fieldset class="tamplete-text">
          <textarea class="new-publication" type='text' rows="4" cols="50" placeholder ="Digite seu post..."></textarea>
            <div class="btns-publication">
              <button class="confirm-publication">Publicar</button>
              <button class="clear-text">Limpar texto</button>
            </div>
        </fieldset>
        
      </div>
      <section class='icon'>
        <img class='iconHome' src='img/icon_home_feed.png'>
        <img class='iconPlus' src='img/icon_plus_feed.png'>
        <img class='iconPerfil' src='img/perfil_feed.png'>
      </section>
       
       `;
  const postsText = rootElement.querySelector('.new-publication');
  const publicationButton = rootElement.querySelector('.confirm-publication');
  const btnClear = rootElement.querySelector('.clear-text');
  const backTimeLine = rootElement.querySelector('.iconHome');

  backTimeLine.addEventListener('click', () => {
    navigation('/feed');
  });

  btnClear.addEventListener('click', () => {
    postsText.value = '';
  });

  publicationButton.addEventListener('click', (e) => {
    e.preventDefault();
    const textPost = postsText.value;

    if (textPost === '') {
      postsText.value = 'Campo vazio';
      postsText.style.color = 'red';
    } else {
      addPublication(textPost).then(() => {
        navigation('/feed');
      });
    }
  });

  return rootElement;
};
