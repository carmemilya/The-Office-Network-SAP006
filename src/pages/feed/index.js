import { navigation } from '../../routes/navigation.js';
import {
  signOut, showPost, deletePost, getCurrentUser, likePost,
} from '../../services/index.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <div class='headerfeed'>
    <h1><img class='logo' src='img/logo_canva.png'></h1>
    <p id="sair-da-conta" class="exitAccount"><img src='img/icon_logout_feed.png'></p>
  </div>  
  <div class= "container">
      <div class='showPublication' ></div>
  
  </div>
      <section class='icon'>
        <img class='iconHome' src='img/icon_home_feed.png'>
        <img class='iconPlus' src='img/icon_plus_feed.png'>
        <img class='iconPerfil' src='img/perfil_feed.png'>
      </section>
      `;

  const sair = rootElement.querySelector('.exitAccount');
  const addPublication = rootElement.querySelector('.iconPlus');
  const showPublicationFeed = rootElement.querySelector('.showPublication');
  const currentUser = getCurrentUser();

  addPublication.addEventListener('click', () => {
    navigation('/add-publication');
  });

  sair.addEventListener('click', (e) => {
    e.preventDefault();
    signOut().then(() => navigation('/'));
  });

  const addPost = (data) => {
    const objetoPost = data.data();
    const like = objetoPost.like;
    const userPost = (objetoPost.email === currentUser.email);

    const tampleteFeed = ` 
    <div class='containerFeed' data-post id='${data.id}'> 
      <div class='dataPost'>${objetoPost.data}</div>
      <div class='emailUserPublication' data-email='${objetoPost.email}'>${objetoPost.email}</div>
      <hr class='line'>
      <div class='postFeed'>${objetoPost.post}</div>
      <hr class='line'>
      <div class='functionsPost'>
        <span class = 'likes'>
          <i class="far fa-heart icone-curtir" data-item="like"></i>
          <span class = 'numero-Likes '>${like.length}</span>
        </span>
        ${userPost ? '<i id="delete-modal" class="far fa-trash-alt" data-item="open-delete"></i>' : ''}
        
      </div>
      <div id="modal-msg" class="modal" data-item="open-modal">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-close" data-item="cancel">x</div>  
            <h1 class="modal-title">Excluir Post</h1>   
          </div>
          <div class="modal-body">
            <h2>Tem certeza que deseja excluir este post?</h2>
          </div>
          <div class="modal-btn">
            <button type="button" data-item="cancel" class="cancelbtn">Cancel</button>
            <button type="button" data-item="confirm" "class="deletebtn">Delete</button>
          </div>
          <div class="modal-footer"></div>
        
        </div>
      </div>
     
        
    </div>
    `;

    showPublicationFeed.innerHTML += tampleteFeed;

    const postTamplete = rootElement.querySelectorAll('[data-post]');
    postTamplete.forEach((post) => {
      post.addEventListener('click', (e) => {
        console.log(post);
        const idPost = post.getAttribute('id');
        const targetDataSet = e.target.dataset.item; //
        console.log(targetDataSet);
        const numeroLike = post.children[5].children[0].children[1];
        const modal = rootElement.querySelector('#modal-msg');
        if (targetDataSet === 'like') {
          console.log('entrou no if certo');
          likePost(idPost, currentUser.uid).then((response) => { numeroLike.innerText = response});
        }
        if (targetDataSet === 'confirm') {
          modal.style.display = 'none';
          deletePost(idPost).then(() => {
            post.remove();
          });
        }
        if (targetDataSet === 'open-delete') {
          console.log(modal);
          console.log('entrou no modal');
          modal.style.display = 'block';
        }
        if (targetDataSet === 'cancel') {
          modal.style.display = 'none';
        }
      });
    });
  };
  showPost().then((allPosts) => {
    allPosts.forEach((individualPost) => addPost(individualPost));
  });
  return rootElement;
};
