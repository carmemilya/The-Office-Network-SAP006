import { navigation } from '../../routes/navigation.js';
import {
  signOut, showPost, deletePost, getCurrentUser, likePost,
} from '../../services/index.js';

export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
  <div class='headerfeed'>
    <h1><img class='logo' src='img/ton.png'></h1>
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

        ${userPost ? '<i id="delete-modal" class="far fa-trash-alt" data-item="delete"></i>' : ''}
      </div>

      <div id="id01" class="modal" data-item="open-modal">
        <form class="modal-content" ">
          <div class="modal-close">x</div>
            <div class="container">
              <h1>Tem certeza que deseja excluir o post?</h1>
              <button type="button" data-confirmdelete class="cancelbtn">Cancel</button>
              <button type="button" data-closemodal class="deletebtn">Delete</button>
            </div>
          </div>
        </form>
      </div>
     
        
    </div>
    `;

    showPublicationFeed.innerHTML += tampleteFeed;

    const postTamplete = rootElement.querySelectorAll('[data-post]');
    for ( let post of postTamplete) {
      post.addEventListener('click', (e) => {
        const idPost = post.getAttribute('id')
        const targetDataSet = e.target.dataset.item
        const numeroLike = post.children[5].children[0].children[1] //<span class = 'numero-Likes '>${like.length}</span>
        if (targetDataSet == 'delete') { 
            deletePost(idPost);    
        }   
        if (targetDataSet == 'like'){
          likePost(idPost, currentUser.uid).then((response) => 
          numeroLike.innerText = response)
              
        } 
      });
      
    }
  }
  showPost(addPost)



      
      
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
