// import Home from "./home.js";
import Home from "/components/repos/index.js";
customElements.define("wc-home", Home);
import AboutUs from "/components/aboutMe/index.js";
customElements.define("wc-about", AboutUs)
import Music from "/components/soundcloud/index.js";
customElements.define("wc-music", Music);
import Video from "/components/youtube/index.js";
customElements.define("wc-video", Video);
import Contact from "/components/contact/index.js";
customElements.define("wc-contact", Contact);
import Login from "/components/login/index.js";
customElements.define("wc-login", Login);
import NotFound from "./notfound.js";
import Users from "./users.js";
import UserDetails from "./userdetails.js";

export { Home, AboutUs, Music, Video, Contact, Login, NotFound, Users, UserDetails };
