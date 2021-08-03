//criar conta 
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
// Login de usuários existentes
export const usuarioExistente = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
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

export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
