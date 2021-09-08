import { navigation } from '../../routes/navigation.js';
import { addPublication } from '../../services/index.js';

export const Publication = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <div class= "tamplete-responsive-publi">
        <div class="purple">
        <div class="black"> 
          <div class="orange"></div>
        </div>
      </div>
      <div class='header-feed'>
      <h1 class="title-website"> The Office Network </h1>
    </div>
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
        <img class='icon-profile-route' src='img/perfil_feed.png'>
      </section>
       
       `;
  const postsText = rootElement.querySelector('.new-publication');
  const publicationButton = rootElement.querySelector('.confirm-publication');
  const btnClear = rootElement.querySelector('.clear-text');
  const backTimeLine = rootElement.querySelector('.iconHome');
  const goToProfile = rootElement.querySelector('.icon-profile-route');

  backTimeLine.addEventListener('click', () => {
    navigation('/feed');
  });

  btnClear.addEventListener('click', () => {
    postsText.value = '';
    postsText.style.color = 'white';
  });

  goToProfile.addEventListener('click', () => {
    navigation('/perfil');
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
