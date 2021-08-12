// Criar conta
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

// criar coleção com informações do usuario
export const creatFormUser = (name, email) => {
  firebase
    .firestore()
    .collection('user')
    .add({
      userName: name,
      userEmail: email,
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    });
};

// Login de usuários existentes
export const existingUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in
      const user = userCredential.user;
      console.log('deu bom', user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('Aqui deu ruim', errorCode, errorMessage);
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
  firebase.auth().signInWithPopup()
    .then((result) => result)
    .catch((error) => error);
};

// adiciona publicação
export const addPublication = (idPost) => {
  firebase
    .firestore()
    .collection('posts')
    .doc(idPost)
    .set({ id: idPost });
};

// mostra os posts
export const showPosts = () => {
  firebase.firestore().collection('posts').get().doc
};