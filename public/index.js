// import Repos from "./components/repos/index.js";
// customElements.define("my-repos", Repos)

// import Modal from "./components/modal/index.js";
// customElements.define("modal-card", Modal)

// import About from "./components/aboutMe/index.js";
// customElements.define("wc-about", About)

// import Soundcloud from "./components/soundcloud/index.js";
// customElements.define("soundcloud-card", Soundcloud)

import Youtube from "./components/youtube/index.js";
customElements.define("youtube-card", Youtube)

import Blog from "./components/blog/index.js";
customElements.define("blog-card", Blog)
const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');

// load all event listners
allEventListners();

// functions of all event listners
function allEventListners() {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClick);
  // nav links click event
  navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
  if(navMenu.classList.contains('open')) {
    navToggler.click();
  }
}