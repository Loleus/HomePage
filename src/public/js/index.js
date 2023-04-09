import Router from "/components/router/index.js";
import Home from "/components/repos/index.js";
import AboutMe from "/components/aboutMe/index.js";
import Music from "/components/soundcloud/index.js";
import Video from "/components/youtube/index.js";
import Contact from "/components/contact/index.js";
import Login from "/components/login/index.js";
import AddPhoto from "/components/addPhoto/index.js";
import EditPhoto from "/components/editPhoto/index.js";
import Photos from "/components/photos/index.js";
import Photo from "/components/photo/index.js";
import NotFound from "/components/errors/index.js";
import Menu from "/components/menu/index.js";

const routes = [
  ["wc-router", Router], ["wc-home", Home], ["wc-about", AboutMe], ["wc-music", Music], ["wc-video", Video], ["wc-contact", Contact], ["wc-login", Login], ["wc-addphoto", AddPhoto], ["wc-editphoto", EditPhoto], ["wc-photos", Photos], ["wc-photo", Photo], ["wc-notfound", NotFound],
];

for (let route of routes) {
  customElements.define(route[0],route[1])
}

export { Router, Home, AboutMe, Music, Video, Contact, Login, AddPhoto, EditPhoto, Photos, Photo, NotFound, Menu};
