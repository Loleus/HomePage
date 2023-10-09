import Home from "./pages/home/index.js";
import Repos from "./pages/repos/index.js";
// import About from "./pages/aboutMe/index.js";
import Music from "./pages/soundcloud/index.js";
import Video from "./pages/youtube/index.js";
import AddPhoto from "./pages/photos/addPhoto/index.js";
import EditPhoto from "./pages/photos/editPhoto/index.js";
import Card from "./pages/photos/photos_card/index.js";
import Photos from "./pages/photos/index.js";
import Contact from "./pages/contact/index.js";
import Login from "./pages/login/index.js";
import NotFound from "./pages/errors/index.js";
import Spinner from "./vendors/spinner/index.js";

const routes = [
  ["wc-home", Home],
  ["wc-repos", Repos],
  // ["wc-about", About],
  ["wc-music", Music],
  ["wc-video", Video],
  ["wc-contact", Contact],
  ["wc-login", Login],
  ["wc-addphoto", AddPhoto],
  ["wc-editphoto", EditPhoto],
  ["wc-photos", Photos],
  ["wc-notfound", NotFound],
  ["wc-spinner", Spinner],
  ["wc-card", Card]
];

for (let route of routes) {
  customElements.define(route[0], route[1])
};

export default {
  Home,
  Repos,
  // About,
  Music,
  Video,
  Contact,
  Login,
  AddPhoto,
  EditPhoto,
  Photos,
  NotFound,
  Spinner,
  Card
};
