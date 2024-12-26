import "regenerator-runtime";
import "../styles/main.scss";
import App from "./views/app";
import swRegister from "./utils/sw-register";

const skipLinkElem = document.querySelector('.skip-link');
skipLinkElem.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.content').focus();
});

const app = new App({
  button: document.querySelector("#hamburgerButton"),
  drawer: document.querySelector("#navigationDrawer"),
  content: document.querySelector("#mainContent"),
});


window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
  swRegister();
});
