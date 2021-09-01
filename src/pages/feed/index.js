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

  const sair = rootElement.querySelector('#sair-da-conta');
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
        
        ${userPost ? '<i class="far fa-trash-alt" data-item="delete"></i>' : ''}
        
    </div>
    `;

    showPublicationFeed.innerHTML += tampleteFeed;

    const postTamplete = rootElement.querySelectorAll('[data-post]');
    for ( let post of postTamplete) {
       post.addEventListener('click', (e) => {
          const idPost = post.getAttribute('id')
          const targetDataSet = e.target.dataset.item
          if (targetDataSet == 'delete') {
            deleteModal
            deletePost(idPost);
            showPublicationFeed.innerHTML = '';
          }
        });
      };
   
  
    for (let post of postTamplete) {
      post.addEventListener('click', (e) => {

        const idPost = post.getAttribute('id') //pega Id do post
        const target = e.target // retorna <i class="far fa-heart icone-curtir" data-item="like"></i>
        const targetDataSet = target.dataset.item //like
        const numeroLike = post.children[5].children[0].children[1] //<span class = 'numero-Likes '>${like.length}</span>
        let nomeLike;
        if (targetDataSet == 'like'){
          likePost(idPost, currentUser.uid)
          numeroLike.innerText = nomeLike
          showPublicationFeed.innerHTML = ''  
        } 
      })
    }
  }
  showPost(addPost)



      // postTamplete.addEventListener('click', (e) => {
      //   const { target } = e;
      //   const likeId = target.dataset.like;
      //   if (likeId) {
      //     const numberLikes = rootElement.querySelector(`[data-numLike="${likeId}"]`);
      //     const beforLike = numberLikes.classList.contains('befor-like');
      //     const number = Number(numberLikes.textContent);
      //     if (beforLike === true) {
      //       numberLikes.classList.replace('befor-like', 'after-like');
      //       numberLikes.innerHTML = number + 1;
      //       liked(likeId);
      //     } else {
      //       numberLikes.classList.replace('after-like', 'befor-like');
      //       numberLikes.innerHTML = number - 1;
      //       liked(likeId);
      //     }
      //   }
      // });
      
    // postTamplete.addEventListener('click', (e) =>{
    //   const target = e.target;
    //   if (target.dataset.like === 'like' && !target.classList.contains('liked'))
    // })
      // for (let post of postTamplete) {
      //   post.addEventListener('click', (e) => {

      //     const idPost = post.getAttribute('id') //id do post
      //     const postUnliked = post.classList.contains('far') // falso (não tem curtida desse usuario)
      //     let likeNumber = rootElement.querySelector('.number-likes') //<span class="number-likes "></span>
      //     let likeNumberContent = Number(likeNumber.innerHTML); // 0
          
      //     if(postUnliked == true){
      //       post.classList.replace('far','fas')
      //       likeNumberContent--
      //       likePost(idPost)
      //     } else {
      //       post.classList.replace('fas', 'far')
      //       likeNumberContent++
      //       UnlikedPost(idPost)
      //     }
          
      //     likeNumber.innerHTML = likeNumberContent 
      //   })
       
      // }
   
  return rootElement;
};