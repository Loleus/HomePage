"use strict";
import { match } from "./util.js";

export default class Router extends HTMLElement {

  get outlet() {
    return this.querySelector("wc-outlet");
  }

  get root() {
    return window.location.pathname;
  }
  get form() {
    return this.querySelector("form")
  }
  get routes() {
    return Array.from(this.querySelectorAll("wc-route"))
      .filter(node => node.parentNode === this)
      .map(r => ({
        path: r.getAttribute("path"),
        // Optional: document title
        title: r.getAttribute("title"),
        // name of the web component the should be displayed
        component: r.getAttribute("component"),
        // Bundle path if lazy loading the component
        resourceUrl: r.getAttribute("resourceUrl")
      }));
  }
  submitForm(e) {
    console.log("prevent")
    e.preventDefault()

  }
  connectedCallback() {
    this.innerHTML = `
  <div class="navbar-area">
    <div class="container">
      <nav class="site-navbar nav">
        <a route="/client" class="site-logo">lolo_2023</a>
        <ul>
          <li><a route="/client">Home</a></li>
          <li><a route="/client/about">About</a></li>
          <li><a route="/client/music">Music</a></li>
          <li><a route="/client/video">Video</a></li>
          <li><a route="/client/users">Blog</a></li>
          <li><a route="/client/contact">Contact</a></li>
          <li><a route="/client/contact">Add Post</a></li>
        </ul>
        <button class="nav-toggler">
          <div></div>
        </button>
        </nav>
    </div>
  </div>
<wc-route path="/" title="Home" component="wc-home"></wc-route>
<wc-route path="/client" title="Home" component="wc-home"></wc-route>

<wc-route path="/client/about" title="About Us" component="wc-about"></wc-route>
<wc-route path="/client/music" title="Music" component="wc-music"></wc-route>
<wc-route path="/client/video" title="Video" component="wc-video"></wc-route>
<wc-route path="/client/contact" title="Contact" component="wc-contact"></wc-route>
<wc-route path="/client/users" title="Users" component="wc-users"></wc-route>
<wc-route path="/client/users/:id" title="User Details" component="wc-userdetails"></wc-route>
<wc-route path="*" title="404" component="wc-notfound"></wc-route>
<wc-outlet></wc-outlet>
`;

    // this.form.addEventListener("submit", this.submitForm)
    this.updateLinks();
    this.navigate(window.location.pathname);
    window.addEventListener("popstate", this._handlePopstate);
    if ( window.history.replaceState ) {
      window.history.replaceState( null, null, window.location.href );
  }
    window.addEventListener("beforeunload", event => {
      event.preventDefault()
      event.returnValue = ""
    })
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this._handlePopstate);
    window.removeEventListener("beforeunload", this.preventNav);
  }

  _handlePopstate = () => {
    this.navigate(window.location.pathname);
  };

  updateLinks() {
    this.querySelectorAll("a[route]").forEach(link => {
      const target = link.getAttribute("route");
      link.setAttribute("href", target);
      link.onclick = e => {
        e.preventDefault();
        this.navigate(target);
      };
    });
  }

  navigate(url) {
    const matchedRoute = match(this.routes, url);
    if (matchedRoute !== null) {
      this.activeRoute = matchedRoute;
      window.history.pushState(null, null, url);
      this.update();
    }
  }

  update() {
    const {
      component,
      title,
      params = {},
      resourceUrl = null
    } = this.activeRoute;

    if (component) {
      while (this.outlet.firstChild) {
        this.outlet.removeChild(this.outlet.firstChild);
      }
      const updateView = () => {
        const view = document.createElement(component);
        document.title = title || document.title;
        for (let key in params) {
          if (key !== "*") view.setAttribute(key, params[key]);
        }
        this.outlet.appendChild(view);
        this.updateLinks();
      };

      if (resourceUrl !== null) {
        import(resourceUrl).then(updateView);
      } else {
        updateView();
      }
    }
  }

  go(url) {
    this.navigate(url);
  }

  back() {
    window.history.go(-1);
  }
}

customElements.define("wc-router", Router);
