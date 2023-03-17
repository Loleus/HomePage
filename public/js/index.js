// const fetchJson = async () => {
//     try {
//         let response = await fetch('/client/getAll');
//         let parsedList = await response.json();
//         return parsedList
//     } catch (err) {
//         console.error(err)
//     }
// }
// const output = ({name}) => {
//     return `<li> ${name} </li>`
// }
// const renderPic = async (urlAddress) => {
//     try {
//         let response = await fetch(urlAddress);
//         let blob = await response.blob();
//         let img = document.createElement('img');
//         img.style = 'position:fixed;top:10px;left:10px;width:100px';
//         document.body.append(img);
//         img.src = URL.createObjectURL(blob);
//         setTimeout(() => {
//             img.remove();
//             URL.revokeObjectURL(img.src);
//         }, 3000);
//     } catch (err) {
//         console.error(err)
//     }
// }

// const renderList = async (category) => {
//     try {
//         let data = await fetchJson();
//         data.forEach(function (item) {
//             item.category == category ? ul.innerHTML += output(item) : null ;
// });
        
//     } catch (err) {
//         console.error(err)
//     }
// }
// const makeButton = (catsArray) => {
//     for (let category of catsArray) {
//         let name = category;
//         let btn = document.createElement('button')
//         btn.textContent = name;
//         nav.append(btn)
//         btn.addEventListener('click', () => {
//             ul.innerHTML = '';
//             renderList(name);
//             for (let b of [...nav.children]) {
//                 b.disabled = false;
//             }
//             btn.disabled = true;
//         });
//     }
// }
// const renderMenu = async () => {
//     let menuCategory = [];
//     try {
//         let getList = await fetchJson();
//         for (let obj of getList) {
//             menuCategory.push(obj.category)
//         }
//         makeButton([...new Set(menuCategory)]);

//     } catch (err) {
//         console.error(err)
//     }
// }
// import Repos from "./components/repos/index.js";
// customElements.define("my-repos", Repos)

// import Modal from "./components/modal/index.js";
// customElements.define("modal-card", Modal)

// import About from "./components/aboutMe/index.js";
// customElements.define("wc-about", About)

// import Soundcloud from "./components/soundcloud/index.js";
// customElements.define("soundcloud-card", Soundcloud)

// import Youtube from "./components/youtube/index.js";
// customElements.define("youtube-card", Youtube)

// import Blog from "./components/blog/index.js";
// customElements.define("blog-card", Blog)
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