import { navigation } from '../../routes/navigation.js';
import {
  signOut, showPost, deletePost, getCurrentUser, likePost, editPost,
} from '../../services/index.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <div class='header-feed'>
    <h1><img class='logo' src='img/fun.png'></h1>
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
      <div class='name-user-publication' data-name='${objetoPost.name}'>${objetoPost.name}</div>
      <hr class='line'>

        <div class='post-feed' contenteditable="false">${objetoPost.post}</div> 
          <div id="modal-edit" class="modal-edit" data-item="open-edit">
            <button type="button" data-item="cancel-edit" class="cancelbtn">Cancel</button>
            <button type="button" data-item="confirm-edit" "class="deletebtn">Salvar</button>
          </div>
      
      <hr class='line'>
      <div class='functionsPost'>
        <span class = 'likes'>
          <i class="far fa-heart icone-curtir" data-item="like"></i>
          <span class = 'numero-Likes '>${like.length}</span>
        </span>
        ${userPost ? '<i id="delete-modal" class="far fa-trash-alt" data-item="open-delete"></i>' : ''}
        <br>
        ${userPost ? '<i id="edit-modal" class="fas fa-pen" data-item="open-edit"></i>' : ''}
        
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

    const deleteItem = (idPost) => {
      deletePost(idPost).then(() => {
        document.getElementById(idPost).remove();
      });
    };

    const idIndividualPost = (idPost, openModal, displayStyle) => {
      const selectPostId = document.getElementById(idPost);
      selectPostId.querySelector(openModal).style.display = displayStyle;
    };

    const postTamplete = rootElement.querySelectorAll('[data-post]');
    postTamplete.forEach((post) => {
      post.addEventListener('click', (e) => {
        const idPost = post.getAttribute('id');
        const targetDataSet = e.target.dataset.item;
        const numeroLike = post.children[6].children[0].children[1];
        const newText = rootElement.querySelector('.post-feed');
        if (targetDataSet === 'like') {
          likePost(idPost, currentUser.uid).then((response) => {
            numeroLike.innerText = response;
          });
        }
        if (targetDataSet === 'open-delete') {
          idIndividualPost(idPost, '#modal-msg', 'block');
        }
        if (targetDataSet === 'confirm') {
          idIndividualPost(idPost, '#modal-msg', 'none');
          deleteItem(idPost);
        }
        if (targetDataSet === 'cancel') {
          idIndividualPost(idPost, '#modal-msg', 'none');
        }
        if (targetDataSet === 'open-edit') {
          const postEdit = document.getElementById(idPost);
          postEdit.querySelector('.modal-edit').style.display = 'block';
          postEdit.querySelector('.post-feed').setAttribute('contenteditable', 'true');
        }
        if (targetDataSet === 'confirm-edit') {
          const postEdit = document.getElementById(idPost);
          const textPost = postEdit.querySelector('.post-feed').innerText;
          editPost(textPost, idPost);
          newText.removeAttribute('contenteditable');
          postEdit.querySelector('#modal-edit').style.display = 'none';
        }
        if (targetDataSet === 'cancel-edit') {
          const postEdit = document.getElementById(idPost);
          postEdit.querySelector('#modal-edit').style.display = 'none';
        }
      });
    });
  };
  showPost().then((allPosts) => {
    allPosts.forEach((individualPost) => addPost(individualPost));
  });
  return rootElement;
};
