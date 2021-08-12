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

// export const resetarSenha = (email) => {
//   firebase.auth().sendPasswordResetEmail(email)
//     .then(() => {
//     // Password reset email sent!
//     // ..
//     })
//     .catch((error) => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//     // ..
//     });
// };

// Login com o Google - Está funcionando (APARENTEMENTE)
export const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  const result = firebase.auth().signInWithPopup(provider);
  return result;
};

// Criar conta - Está Funcionando (APARENTEMENTE)
export const createUser = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => error.code);
};

// Manter usuário logado
export const mantemConectado = (callback) => firebase.auth().onAuthStateChanged(callback);

// export const manterConectado = () => {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user.uid) {
//       const uid = user.uid;
//       navigation('/feed');
//       // ...
//     } else {
//       navigation('/');
//     }
//   });
// };

/// Desconectar Usuário
export const signOut = () => firebase.auth().signOut();
