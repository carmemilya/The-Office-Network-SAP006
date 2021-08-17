import { navigation } from '../routes/navigation.js';

// Login de usuários existentes
export const existingUser = (email, password, errorFunction) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      navigation('/feed');
      const user = userCredential.user;
      return user;
    })
    .catch((error) => errorFunction(error));
};

// criar coleção com informações do usuario
export const creatFormUser = async (userId, name, email) => {
  const collectionUser = await firebase.firestore().collection('user').doc(userId).set({
    userName: name,
    userEmail: email,
  });
  return collectionUser;
};

// Criar conta - Está Funcionando (APARENTEMENTE)
export const createUser = async (email, password) => {
  const creatUser = await firebase.auth().createUserWithEmailAndPassword(email, password);
  return creatUser;
};

// adiciona publicação
export const addPublication = async (postsText) => {
  const usuarioExistente = firebase.auth().currentUser;
  console.log(usuarioExistente);
  const postUser = await firebase.firestore().collection('posts').add({
    email: usuarioExistente.email,
    post: postsText,
    like: 0,
  });
  return postUser;
};

// Login com o Google - Está funcionando (APARENTEMENTE)
export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = firebase.auth().signInWithPopup(provider);
  return result;
};

// Manter usuário logado
export const mantemConectado = (callback) => firebase.auth().onAuthStateChanged(callback);

/// Desconectar Usuário
export const signOut = () => firebase.auth().signOut();
