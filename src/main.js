import {Register} from './lib/signup/index.js';

const main = document.querySelector("#root")

window.addEventListener("load", () => {
  main.appendChild(Register());
})

 






// firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     console.log("deu bom", user);
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
    
//     // ..
//     console.log ("Aqui deu ruim", errorCode, errorMessage);
//   });

// }

// buttonEntrar.addEventListener("click", autenticar)

// const Autentic = () =>{
//   createUser(inpu)
// }

// buttonEntrar.addEventListener("click", autenticar)