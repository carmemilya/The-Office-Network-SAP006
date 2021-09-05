import { navigation } from '../../routes/navigation.js';
import { addPublication } from '../../services/index.js';

//  import { navigation } from
export const Publication = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <h1>The Office Network</h1>
      <div class= "container">
      <h2>No que está pensando</h2>
        <fieldset>
          <input class='newPublication' type='text'>
          <button class='BtnNewPublication'>Publicar</button>
          <ul class='showPublication'></ul>
        </fieldset>
        
      </div>
        <section class='icon'>
          <img class='iconHome' src='img/icon_home_feed.png'>
          <img class='iconPlus' src='img/icon_plus_feed.png'>
          <img class='iconPerfil' src='img/perfil_feed.png'>
        </section>
       
       `;
  const postsText = rootElement.querySelector('.newPublication');
  const publicationButton = rootElement.querySelector('.BtnNewPublication');
  const backTimeLine = rootElement.querySelector('.iconHome');

  backTimeLine.addEventListener('click', () => {
    navigation('/feed');
  });

  publicationButton.addEventListener('click', (e) => {
    e.preventDefault();
    const textPost = postsText.value;
    // const userEmail = firebase.auth().currentUser.email;
    // const userId = firebase.firestore().collection('user').doc();

    if (textPost === '') {
      console.log('Campo vazio');
    } else {
      addPublication(textPost).then(() => {
        navigation('/feed');
      });
    }
  });

  return rootElement;
};
