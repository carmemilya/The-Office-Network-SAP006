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

export const resetarSenha = (email) => {
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
    // Password reset email sent!
    // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    // ..
    });
};

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

/// Desconectar Usuário
export const signOut = () => {
  firebase.auth().signOut().then(() => {
  }).catch((error) => {
  });
};

// Botão de resetar a senha  <3
