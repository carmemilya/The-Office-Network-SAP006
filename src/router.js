import {Register} from "./pages/signup/index.js"
import {Login} from "./pages/login/index.js"

const routeRender = () =>{
    const element = document.querySelector('#root');
  
    const routes =  {
         "/":Login,
        "/login":Register
        // "/Feed": Feed,
        //"/Publicacao": Publicar

    } 

     
    element.innerHTML = "";
    element.appendChild(routes[window.location.pathname]());
    console.log(window.location.pathname)
}

window.addEventListener("popstate", routeRender)
window.addEventListener("load", () => {
   routeRender();
})
