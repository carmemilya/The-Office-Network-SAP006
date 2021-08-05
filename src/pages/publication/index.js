export const Publication = () => {
  const rootElement = document.createElement('div');
  rootElement.innerHTML = `
    <h1>The Office Network</h1>
      <div class="backToLogin">
        <p class="sair"><img src='img/icon_logout_feed.png'></p>
      </div>
      <div class= "container">
        <fieldset>
          <h2>No que está pensando</h2>
          <input class='newPublication' type='text'>
          <button class='BtnNewPublication'>Publicar</button>

        </fieldset>
        
      </div>
        <section class='iconHome'>
          <img class='iconHome' src='img/icon_home_feed.png'>
          <img class='iconPlus' src='img/icon_plus_feed.png'>
          <img class='iconPerfil' src='img/perfil_feed.png'>
        </section>
       
       `;
 
  const posts = rootElement.querySelector('.newPublication');
  const db = firebase.firestore();

  db.collection("posts").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error); 
    });

  return rootElement;
};
