export const Feed = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
      <h1>The Office Network</h1>
      <div class= "container">
        <hr>
            <p>FEED DE NOTICIAS TEY TEY</p>
        <hr>
      
       <div class="entrarLogin">
          <p class="sair">SAIR</p>
       </div>
      </div>
  
      `;

  const cadastro = rootElement.querySelector('.sair');
  cadastro.addEventListener('click', () => {
    window.history.pushState({}, '', '/');
    const popstateEvent = new PopStateEvent('popstate', { state: {} });
    dispatchEvent(popstateEvent);
  });
  return rootElement;
};
