import { showPosts, sairDaConta} from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <h1>The Office Network</h1>
    <div class= "container">
      <hr>
        <p>FEED DE NOTICIAS TEY TEY</p>
      <hr>
      
      <div class="entrarLogin">
        <p class="sair"><img src='img/icon_logout_feed.png'></p>
      </div>

      <ul class='showPublication'></ul>

    </div>
      <section class='iconHome'>
        <img class='iconHome' src='img/icon_home_feed.png'>
        <img class='iconPlus' src='img/icon_plus_feed.png'>
        <img class='iconPerfil' src='img/perfil_feed.png'>
      </section>
     
  
      `;

  // const homeFeed = rootElement.querySelector('.iconHome');
  const entrarLogin = rootElement.querySelector('.sair');
  const addPublication = rootElement.querySelector('.iconPlus');
  const showPublicationFeed = rootElement.querySelector('.showPublication');

  const docRef = firebase.firestore().collection('post').doc();
  console.log(docRef.id); // pega o id do usuario

  const addPost = (post) => {
    const postTamplete = `
    <li class='${post.id}'>
    ${post.text} ${post.likes}
    </li>
    `;
    showPublicationFeed.innerHTML += postTamplete;
  };
  addPost(docRef);

  // showPosts().then((snap) => {
  //   snap.forEach((docRef.id) => {
  //     addPost(docRef);
  //   });
  // });
  // add posts
  // const addPost = (post) => {
  //   const postTamplete = `
  //   <li class='${post.id}'>
  //   ${post.data().text} ${post.data().likes}
  //   </li>
  //   `;
  //   showPublicationFeed.innerHTML += postTamplete;
  // };
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

  addPublication.addEventListener('click', () => {
    navigation('/add-publication');
  });

  entrarLogin.addEventListener('click', () => {
    sairDaConta();
    navigation('/');
  });
  return rootElement;
};