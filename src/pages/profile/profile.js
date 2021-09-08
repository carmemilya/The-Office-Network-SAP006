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
  const profilePage = document.createElement('section');
  profilePage.setAttribute('class', 'container background');
  profilePage.innerHTML = `
    <div class="container-principal">
        <header>
            <img class="logo-img" src="img/fun.png" alt="logo">
        </header>
        <main class="container-main">
            <form class="forms-profile">
            <label class="label label-profile" for="chk" aria-hidden="true">Perfil</label>
                <div class="photo-profile">
                  <img class="icon-profile" src="" alt="profile" title="profile">
                   
                      <div class="fas fa-plus-square">
                        <input class="inputPhoto" type="file">
                      </div>
                </div>
                
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
                <section class='icon'>
                  <img class='icon-home' src='img/icon_home_feed.png'>
                  <img class='iconPlus' src='img/icon_plus_feed.png'>
                  <img class='icon-profile' src='img/perfil_feed.png'>
                </section>
            </form>
        </main>
    </div>       
    `;

  const inputName = profilePage.querySelector('.name-input');
  const iconProfile = profilePage.querySelector('.icon-profile');
  const inputPhoto = profilePage.querySelector('.inputPhoto');
  const openEditPhoto = profilePage.querySelector('.openOptionPhoto');
  const btnSave = profilePage.querySelector('#btn-save');
  const btnBackFeed = profilePage.querySelector('.icon-home');
  const modalBg = profilePage.querySelector('.modal-bg');
  const modalClose = profilePage.querySelector('.modal-close');

  // SALVANDO AS INFORMAÇÕES DO PERFIL
  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    user.updateProfile({
      displayName: inputName.value,
    });
    modalBg.classList.add('bg-active');
  });

  modalClose.addEventListener('click', (e) => {
    e.preventDefault();
    modalBg.classList.remove('bg-active');
  });

  // FOTO DE PERFIL
  iconProfile.src = user.photoURL;
  inputPhoto.addEventListener('change', (e) => {
    const file = e.target.files[0];
    updatePhotoProfile(user.uid, file);
    downloadPhotoProfile(user.uid).then((url) => {
      const imgProfile = url;
      user.updateProfile({
        photoURL: imgProfile,
      });
    });
  });

  // BOTÃO PARA RETORNAR PRO FEED
  btnBackFeed.addEventListener('click', (e) => {
    e.preventDefault();
    navigation('/feed');
  });

  return rootElement.appendChild(profilePage);
};
