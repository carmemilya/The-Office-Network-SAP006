import { navigation } from '../../routes/navigation.js';
import { signOut, showPost, deletePost } from '../../services/index.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <h1>The Office Network</h1>
    <div class= "container">
      
      <div class="entrarLogin">
       <p id="sair-da-conta" class="exitAccount"><img src='img/icon_logout_feed.png'></p>
      </div>

      <div class='showPublication'></div>

      
    </div>
      <section class='icon'>
        <img class='iconHome' src='img/icon_home_feed.png'>
        <img class='iconPlus' src='img/icon_plus_feed.png'>
        <img class='iconPerfil' src='img/perfil_feed.png'>
      </section>
      `;

  // const homeFeed = rootElement.querySelector('.iconHome');
  const sair = rootElement.querySelector('.exitAccount');
  const addPublication = rootElement.querySelector('.iconPlus');
  const showPublicationFeed = rootElement.querySelector('.showPublication');

  function addPost(data) {
    const dataPost = data.data().data;
    const tampleteFeed = ` 
    <div class='containerFeed' id='${data.id}'> 
     <div class='dataPost'>${dataPost}</div>
     <div class='emailUserPublication' data-email='${data.data().email}'>${data.data().email}</div>
     <div class='publicationFeed'>
      
        <div>${data.data().post}</div>
     </div>
     <div class='functionsPost'>
      <div>${data.data().like}</div>
      <button class='excluir' data-id='${data.id}'>delete</button>
     </div>
    </div>
    `;

    showPublicationFeed.innerHTML += tampleteFeed;
  }

  showPost(addPost);

  // const emailUserPublication = rootElement.querySelectorAll('.emailUserPublication');
  //   console.log(emailUserPublication);
  const deleteButton = rootElement.querySelector('.showPublication');
  deleteButton.addEventListener('click', (event) => {
    // const usuarioExistente = firebase.auth().currentUser;
    // if( usuarioExistente.email === )
    const containerPublication = event.target.dataset;
    deletePost(containerPublication.id);
  });

  // showPublicationFeed.innerHTML += tampleteFeed;
  //  const deleteButton = tampleteFeed.querySelector('.excluir');
  // deleteButton.addEventListener('click', () => {
  //   deletePost(data.data().uid);
  // });
  // const deletePost = (postId) => {
  //   const postsCollection = firebase.firestore().collection('posts');
  //   postsCollection.doc(postId).delete().then(doc => {
  //     console.log('Apagou!');
  //     loadPosts();
  //   });
  // };
  // deletePost();

  addPublication.addEventListener('click', () => {
    navigation('/add-publication');
  });

  // Acho que tá funcionando kkkcrying
  sair.addEventListener('click', (e) => {
    e.preventDefault();
    signOut().then(() => navigation('/'));
  });
  return rootElement;
};
