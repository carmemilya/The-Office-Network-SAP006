import { navigation } from '../../routes/navigation.js';
import { addPublication } from '../../services/index.js';

//  import { navigation } from
export const Publication = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <h1>The Office Network</h1>
      <div class="backToLogin">
        <p class="sair"><img src='img/icon_logout_feed.png'></p>
      </div>
      <div class= "container">
      <h2>No que está pensando</h2>
        <fieldset>
          <input class='newPublication' type='text'>
          <button class='BtnNewPublication'>Publicar</button>
          <ul class='showPublication'></ul>

        </fieldset>
        
      </div>
        <section class='iconHome'>
          <img class='iconHome' src='img/icon_home_feed.png'>
          <img class='iconPlus' src='img/icon_plus_feed.png'>
          <img class='iconPerfil' src='img/perfil_feed.png'>
        </section>
       
       `;
  const backToLogin = rootElement.querySelector('.sair');
  const postsText = rootElement.querySelector('.newPublication');
  const publicationButton = rootElement.querySelector('.BtnNewPublication');
  const backTimeLine = rootElement.querySelector('.iconHome');

  backToLogin.addEventListener('click', () => {
    navigation('/');
  });

  backTimeLine.addEventListener('click', () => {
    navigation('/feed');
  });

  publicationButton.addEventListener('click', (e) => {
    e.preventDefault();
    const textPost = postsText.value;
    const userId = firebase.auth().currentUser.email;
    // const userId = firebase.firestore().collection('user').doc();
    if (textPost === '') {
      console.log('Campo vazio');
    } else {
      const formPost = {
        userEmail: userId,
        post: textPost,
        likes: 0,
      };
      addPublication(formPost).then(() => navigation('/feed'));
    }
  });

  // add posts
  // const addPost = (post) => {
  //   const postTamplete = `
  //   <li class='${post.id}'>
  //   ${post.data().text} ${post.data().likes}
  //   </li>
  //   `;
  //   showPublicationFeed.innerHTML += postTamplete;
  // };

  // // mostrar todos os posts
  // const loadPosts = () => {
  //   const postCollection = firebase.firestore().collection('posts');
  //   postCollection.get().then((snap) => {
  //     snap.forEach((post) => {
  //       addPost(post);
  //     });
  //   });
  // };

  // const deletePost = (postId) => {
  //   const postsCollection = firebase.firestore().collection('posts');
  //   postsCollection.doc(postId).delete().then(doc => {
  //     console.log('Apagou!');
  //     loadPosts();
  //   });
  // };
  // deletePost();
  return rootElement;
};