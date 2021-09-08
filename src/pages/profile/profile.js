import {
  getCurrentUser,
  updatePhotoProfile,
  downloadPhotoProfile,
} from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Profile = () => {
  const user = getCurrentUser();
  console.log(user);
  const userPhoto = user.photoURL;
  const rootElement = document.createElement('div');
  rootElement.innerHTML = '';
  const editProfile = document.createElement('section');
  editProfile.setAttribute('class', 'container background');
  editProfile.innerHTML = `
    <div class="container-principal"  >
      <header>
        <div class= "tamplete-responsive-publi">
          <div class="purple">
            <div class="black"> 
              <div class="orange"></div>
            </div>
          </div>
        </div>

        <div class='header-profile'>
          <h1 class="title-website"> The Office Network </h1>
        </div>
        
        <img class="logo-img" src="img/fun.png" alt="logo">
      </header>

      <main class="container-main">
        <form class="forms-profile">
          <label class="label label-profile" for="chk" aria-hidden="true">Perfil</label>

          <div class="photo-profile">
            <img class="icon-profile" src="${userPhoto}" alt="profile" title="profile">
              <input class="inputPhoto" type="file">
            
          </div>
          <fieldset class="form-login">
            <div class="icons-input">
                <i class="fas fa-user icons" ></i>
            </div>
            <div class="name-input" type="text" id="text-name" contenteditable="false">${user.displayName}</div>
            
          </fieldset>


          
          <div class="modal-bg">
            <button class="modal-close">Cancel</button>
            <button class="btn" id="btn-save" type="button" data-item="save">Salvar</button>  
          </div>
          <p class="modal-phrase">Informações salvas.</p>

          
        </form>
      </main>
          <section class='icon'>
            <img class='icon-home' src='img/icon_home_feed.png'>
            <img class='plus-icon-pub' src='img/icon_plus_feed.png'>
            <img class='route-profile' src='img/perfil_feed.png'>
          </section>
    </div>       
    `;

  const name = editProfile.querySelector('.name-input');
  const iconProfile = editProfile.querySelector('.icon-profile');
  const inputPhoto = editProfile.querySelector('.inputPhoto');
  const btnSave = editProfile.querySelector('#btn-save');
  const btnFeed = editProfile.querySelector('.icon-home');
  const modalBg = editProfile.querySelector('.modal-bg');
  const modalClose = editProfile.querySelector('.modal-close');
  const iconOpenModal = editProfile.querySelector('.fa-user');
  const msgSave = editProfile.querySelector('.modal-phrase');
 

  iconOpenModal.addEventListener('click', () => {
    modalBg.style.display = 'block';
    name.setAttribute('contenteditable', 'true');
  });

  modalClose.addEventListener('click', () => {
    navigation('/perfil');
  });

  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    user.updateProfile({
      displayName: name.innerText,
    });
    msgSave.style.display = 'block';
    name.removeAttribute('contenteditable');
    modalBg.style.display = 'none';
  });

  // Adicionando foto de perfil
  // iconProfile.src = user.photoURL;
  iconProfile.addEventListener('click', () => {
    inputPhoto.click();
  });

  inputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    updatePhotoProfile(user.uid, file).then(() => {
      downloadPhotoProfile(user.uid).then((url) => {
        iconProfile.src = url;
        user.updateProfile({
          photoURL: iconProfile,
        });
      });
    });
    iconProfile.src = user.photoURL;
  });

  // Leva pro feed
  btnFeed.addEventListener('click', (e) => {
    e.preventDefault();
    navigation('/feed');
  });

  return rootElement.appendChild(editProfile);
};
