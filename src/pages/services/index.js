
export const createUser= (email, password) =>{
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
  //Signed in
  let user = userCredential.user;
  console.log("deu bom", user);
  // ...
  })
  .catch((error) => {
  let errorCode = error.code;
  let errorMessage = error.message;  
   // ..
  console.log ("Aqui deu ruim", errorCode, errorMessage);
  });  
  
} 
 
