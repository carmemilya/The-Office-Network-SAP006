import {
  getCurrentUser,
  updatePhotoProfile,
  downloadPhotoProfile,
} from '../../services/index.js';
import { navigation } from '../../routes/navigation.js';

export const Profile = () => {
  const user = getCurrentUser();
  const rootElement = document.createElement('div');
  rootElement.innerHTML = '';
  const editProfile = document.createElement('section');
  editProfile.setAttribute('class', 'container background');
  editProfile.innerHTML = `
    <div class="container-principal">
        <header>
            <img class="logo-img" src="img/fun.png" alt="logo">
        </header>
        <main class="container-main">
            <form class="forms-profile">
            <label class="label label-profile" for="chk" aria-hidden="true">Perfil</label>
                <div class="photo-profile">
                <img class="icon-profile" src="" alt="profile" title="profile">
                </div>
                <input class="inputPhoto" type="file" />
            <fieldset class="form-login">
                <input class="name-input" type="text" id="text-name" placeholder="User Name" value="${user.displayName}">
                <div class="icons-input">
                    <i class="fas fa-user icons"></i>
                </div>
            </fieldset>
            <fieldset class="form-login">
                <input class="email-input" type="email" id="profile-email" value="${user.email}">
                <div class="icons-input">
                <i class="far fa-envelope icons"></i>
                </div>
            </fieldset>
            <button class="btn" id="btn-save" type="button">Salvar</button>
                <div class="modal-bg">
                <div class="modal"></div>
                    <h2 class="modal-phrase">Informações salvas.</h2>
                    <button class="modal-close">X</button>
                </div>
                <section class='icon-perfil'>
                  <img class='iconHome' src='img/icon_home_feed.png'>
              </section>
            </form>
        </main>
    </div>       
    `;

  const name = editProfile.querySelector('.name-input');
  const iconProfile = editProfile.querySelector('.icon-profile');
  const inputPhoto = editProfile.querySelector('.inputPhoto');
  const btnSave = editProfile.querySelector('#btn-save');
  const btnFeed = editProfile.querySelector('.iconHome');
  const modalBg = editProfile.querySelector('.modal-bg');
  const modalClose = editProfile.querySelector('.modal-close');

  modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    modalBg.classList.remove('bg-active');
  });

  // Adicionando foto de perfil
  iconProfile.src = user.photoURL;
  inputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    updatePhotoProfile(user.uid, file);
    downloadPhotoProfile(user.uid).then((url) => {
      const imgProfile = url;
      user.updateProfile({
        photoURL: imgProfile.value,
      });
    });
  });

  // Salvar as informações do perfil
  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    user.updateProfile({
      displayName: name.value,
    });
    modalBg.classList.add('bg-active');
  });

  // Leva pro feed
  btnFeed.addEventListener('click', (e) => {
    e.preventDefault();
    navigation('/feed');
  });

  return rootElement.appendChild(editProfile);
};
