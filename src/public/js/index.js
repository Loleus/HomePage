import Router from "/components/router/index.js";
import Home from "/components/pages/home/index.js";
import Repos from "/components/pages/repos/index.js";
import AboutMe from "/components/pages/aboutMe/index.js";
import Music from "/components/pages/soundcloud/index.js";
import Video from "/components/pages/youtube/index.js";
import Contact from "/components/pages/contact/index.js";
import Login from "/components/pages/login/index.js";
import AddPhoto from "/components/pages/photos/addPhoto/index.js";
import EditPhoto from "/components/pages/photos/editPhoto/index.js";
import Photos from "/components/pages/photos/index.js";
import NotFound from "/components/errors/index.js";
import Menu from "/components/menu/index.js";
import Spinner from "/components/spinner/index.js";
import Card from "/components/pages/photos/photos_card/index.js";

const routes = [
  ["wc-router", Router], ["wc-home", Home], ["wc-repos", Repos], ["wc-about", AboutMe], ["wc-music", Music], ["wc-video", Video], ["wc-contact", Contact], ["wc-login", Login], ["wc-addphoto", AddPhoto], ["wc-editphoto", EditPhoto], ["wc-photos", Photos], ["wc-notfound", NotFound],["wc-spinner", Spinner],["wc-card", Card]
];

for (let route of routes) {
  customElements.define(route[0],route[1])
};

export { Router, Home, Repos, AboutMe, Music, Video, Contact, Login, AddPhoto, EditPhoto, Photos, NotFound, Menu,  Spinner, Card};
