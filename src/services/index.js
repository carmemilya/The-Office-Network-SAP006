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

export const getCurrentUser = () => {
  const usuarioExistente = firebase.auth().currentUser;
  return usuarioExistente;
};

// adiciona publicação
export const addPublication = async (postsText) => {
  const usuarioExistente = firebase.auth().currentUser;
  const postUser = await firebase.firestore().collection('posts').add({
    email: usuarioExistente.email,
    data: (new Date()).toString().slice(4, 21),
    user: usuarioExistente.uid,
    post: postsText,
    like: [],
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

export const signOut = () => {
  localStorage.removeItem('uid');
  firebase.auth().signOut();
};

// export const getPost = () => {
//   return firebase.firestore().collection('posts').get(); 
// }
// mostra os posts
export const showPost = (addPost) => {
  firebase.firestore().collection('posts')
    .onSnapshot((qualquer) => {
      qualquer.forEach((post) => addPost(post));
    });
};

// exclui os posts
export const deletePost = (postId) => {
  const postsCollection = firebase.firestore().collection('posts');
  return postsCollection.doc(postId).delete();
};

export const likePost = async (idPost, userId) => {
  await firebase.firestore().collection('posts').doc(idPost).get()
    .then((post) => {
      const arrayLike = post.data().like;
      if (arrayLike.indexOf(userId) === -1) {
        firebase.firestore().collection('posts').doc(idPost).update({
          like: firebase.firestore.FieldValue.arrayUnion(userId),
        });
      } else {
        firebase.firestore().collection('posts').doc(idPost).update({
          like: firebase.firestore.FieldValue.arrayRemove(userId),
        });
      }
    });
};




// export const likePost = (idPost, userId) => {
//   const posts = firebase.firestore().collection('posts').doc(idPost)
//   posts.get()
//   .then((post) => {
//     const likesArray = post.data().like
//     if (likesArray.indexOf(userId == -1)) {
//       posts.update({
//         like: firebase.firestore.FieldValue.arrayUnion(userId)
//       });
//     } else {
//       posts.update({
//         like: firebase.firestore.FieldValue.arrayRemove(userId)
//       })
//     };
//   })
//   .catch((error) => {
//     console.error("Error writing document: ", error);
//   })
// };
  


// // array.lenght
// export const UnlikedPost = (idPost) => {
//   firebase.firestore().collection('posts').doc(idPost).update({
//     like: firebase.firestore.FieldValue.arrayRemove(getCurrentUser().uid),
//   });
// };

// export const arrayUserLike = (idPost) => {
//   firebase.firestore().collection('posts').doc(idPost).filter((item) => {
//     if(item.uid == getCurrentUser().uid){
//       return true;
//     } else {
//       return false;
//     };
//   });
// };