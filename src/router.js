import {Login} from "./pages/login/index.js"
import {Register} from "./pages/signup/index.js"


const routeRender = () =>{
    const element = document.querySelector('#root');
  
    const routes =  {
         "/":Login,
         "/cadastro":Register
        // "/Feed": Feed,
        //"/Publicacao": Publicar
    }
    element.innerHTML = "";
    element.appendChild(routes[window.location.pathname]());   
}

window.addEventListener("popstate", routeRender)
window.addEventListener("load", () => {
   routeRender();
})
