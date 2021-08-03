// Login de usuários existentes
export const existingUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

// Login para novos usuários
export const createUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('deu bom', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log ('Aqui deu ruim', errorCode, errorMessage);
    });
};

// Sair
export const sairDaConta = () => {
  firebase.auth().signOut().then(() => {
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
  });
};

// Login com o Google
export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      window.history.pushState({}, '', '/feed');
      const popStateEvent = new PopStateEvent('popstate', { state: {} });
      dispatchEvent(popStateEvent);
      return result;
    }).catch(error => error);
};
