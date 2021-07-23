// Este é o ponto de entrada da sua aplicação

// import { myFunction } from './lib/index.js';

// myFunction();

// Criar por DOM -
const email = 'thalita.neves24@gmail.com';
const password = 'Tete300';

// Retorna PROMISSE - Metodo ASSÍNCRONO.
// Se retornar THEN, promessa deu certo - Se retornar CATCH, promessa deu errada.

// Novos usuários

firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

// Login de usuários existentes.

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

// Fazer Login com provedor do GOOGLE.

const provider = new firebase.auth.GoogleAuthProvider();
