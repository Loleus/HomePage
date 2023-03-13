// import Home from "./home.js";
import Home from "/components/repos/index.js";
customElements.define("wc-home", Home);
// import AboutUs from "./about.js";
import AboutUs from "/components/aboutMe/index.js";
customElements.define("wc-about", AboutUs)
import NotFound from "./notfound.js";
import Users from "./users.js";
import UserDetails from "./userdetails.js";

export { Home, AboutUs, NotFound, Users, UserDetails };
