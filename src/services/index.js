import { navigation } from '../routes/navigation.js';

const db = firebase.auth();
// Login de usuários existentes
export const existingUser = (email, password, errorFunction) => {
  db.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      navigation('/feed');
      const user = userCredential.user;
      return user;
    })
    .catch((error) => errorFunction(error));
};

// Login com o Google - Está funcionando (APARENTEMENTE)
export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = db.signInWithPopup(provider);
  return result;
};

// Criar conta - Está Funcionando
export const createUser = (name, email, password) => db
  .createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    navigation('/feed');
    const user = userCredential.user;
    user.updateProfile({
      displayName: name,
    });
    return user;
  })
  .catch((error) => { 
     console.log(error.code);
     cosole.log(error.message);
  });

// Manter usuário logado
export const userConected = (callback) => db.onAuthStateChanged(callback);

/// Desconectar Usuário
export const signOut = () => {
  localStorage.removeItem('uid');
  db.signOut();
};

export const getCurrentUser = () => {
  const usuarioExistente = firebase.auth().currentUser;
  return usuarioExistente;
};

// Adicionar publicação
export const addPublication = async (postsText) => {
  const postUser = await firebase.firestore().collection('posts').add({
    name: getCurrentUser().displayName,
    email: getCurrentUser().email,
    data: (new Date()).toLocaleString('pt-BR'),
    user: getCurrentUser().uid,
    post: postsText,
    like: [],
  });
  return postUser;
};

// mostra os posts
export const showPost = () => firebase.firestore().collection('posts').orderBy('data', 'desc').get();

// Excluir posts
export const deletePost = (postId) => {
  const postsCollection = firebase.firestore().collection('posts').doc(postId).delete();
  return postsCollection;
};

// Editar post
export const editPost = (newText, postId) => firebase.firestore().collection('posts').doc(postId)
  .update({
    post: newText,
  });

// Curtir Posts
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

// Incluir imagem no perfil
export const updatePhotoProfile = (userId, file) => firebase.storage().ref(`imageProfile/${userId}`).put(file);

export const downloadPhotoProfile = (userId) => firebase.storage().ref().child(`imageProfile/${userId}`).getDownloadURL();
