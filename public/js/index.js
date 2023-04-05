import Router from "/components/router/index.js";
customElements.define("wc-router", Router);

import Home from "/components/repos/index.js";
customElements.define("wc-home", Home);
import AboutMe from "/components/aboutMe/index.js";
customElements.define("wc-about", AboutMe)
import Music from "/components/soundcloud/index.js";
customElements.define("wc-music", Music);
import Video from "/components/youtube/index.js";
customElements.define("wc-video", Video);
import Contact from "/components/contact/index.js";
customElements.define("wc-contact", Contact);
import Login from "/components/login/index.js";
customElements.define("wc-login", Login);
import AddPhoto from "/components/addPhoto/index.js";
customElements.define("wc-addphoto", AddPhoto);
import EditPhoto from "/components/editPhoto/index.js";
customElements.define("wc-editphoto", EditPhoto);
import Photos from "/components/photos/index.js";
customElements.define("wc-photos", Photos);
import Photo from "/components/photo/index.js";
customElements.define("wc-photo", Photo);
import NotFound from "/components/errors/index.js";
customElements.define("wc-notfound", NotFound);
import Menu from "/components/menu/index.js";

export { Router, Home, AboutMe, Music, Video, Contact, Login, AddPhoto, EditPhoto, Photos, Photo, NotFound, Menu};
