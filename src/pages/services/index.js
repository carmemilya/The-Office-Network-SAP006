const email = '';
const senha = '';

// CRIAR NOVOS USUÁRIOS
firebase.auth().createUserWithEmailAndPassword(email, senha)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("deu bom", user);
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    // ..
    console.log ("Aqui deu ruim", errorCode, errorMessage);
  });

}

buttonEntrar.addEventListener("click", autenticar)

const Autentic = () =>{
  createUser(inpu)
}

buttonEntrar.addEventListener("click", autenticar)