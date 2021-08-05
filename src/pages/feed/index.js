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
    </div>
      <section class='iconHome'>
        <img class='iconHome' src='img/icon_home_feed.png'>
        <img class='iconPlus' src='img/icon_plus_feed.png'>
        <img class='iconPerfil' src='img/perfil_feed.png'>
      </section>
     
  
      `;

  // const homeFeed = rootElement.querySelector('.iconHome');
  const cadastro = rootElement.querySelector('.sair');
  const addPublication = rootElement.querySelector('.iconPlus');

  addPublication.addEventListener('click', () => {
    window.history.pushState({}, '', '/new-publication');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });

  cadastro.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    const popStateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popStateEvent);
  });
  return rootElement;
};
