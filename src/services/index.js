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

// Criar conta - Está Funcionando
export const createUser = (email, password, errorFunction) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
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

// Login com o Google - Está funcionando (APARENTEMENTE)
export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = firebase.auth().signInWithPopup(provider);
  return result;
};

export const getCurrentUser = () => {
  const usuarioExistente = firebase.auth().currentUser;
  return usuarioExistente;
};
// Manter usuário logado
export const mantemConectado = (callback) => firebase.auth().onAuthStateChanged(callback);

/// Desconectar Usuário
export const signOut = () => firebase.auth().signOut();

// adiciona publicação
export const addPublication = async (postsText) => {
  const usuarioExistente = firebase.auth().currentUser;
  const postUser = await firebase.firestore().collection('posts').add({
    email: usuarioExistente.email,
    data: (new Date()).toLocaleString('pt-BR'),
    user: usuarioExistente.uid,
    post: postsText,
    like: [],
  });
  return postUser;
};

// mostra os posts
export const showPost = () => firebase.firestore().collection('posts').orderBy('data', 'desc').get();

// exclui os posts
export const deletePost = (postId) => {
  const postsCollection = firebase.firestore().collection('posts').doc(postId).delete();
  return postsCollection;
};

export const likePost = async (idPost, userId) => {
  const postLike = await firebase.firestore().collection('posts').doc(idPost).get()
    .then((post) => {
      const arrayLike = post.data().like;
      let arrayLength = arrayLike.length;
      if (arrayLike.indexOf(userId) === -1) {
        firebase.firestore().collection('posts').doc(idPost).update({
          like: firebase.firestore.FieldValue.arrayUnion(userId),
        });
        arrayLength += 1;
      } else {
        firebase.firestore().collection('posts').doc(idPost).update({
          like: firebase.firestore.FieldValue.arrayRemove(userId),
        });
        arrayLength -= 1;
      }
      return arrayLength;
    });
  return postLike;
};
