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

// const db = firebase.firestore();

// db.collection("users").add({
//   first: "Ada",
//   last: "Lovelace",
//   idUser: userCredential.uid,
// })
// .then((docRef) => {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//   console.error("Error adding document: ", error);
// });

// db.collection("posts").add({
//   titulo: titleInput.value,
//   content: contentInout.value,
// })
// .then((docRef) => {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//   console.error("Error adding document: ", error);
// });
// `
// <article id=${docRef.id}>${docRef.id.titulo}</article>
// `