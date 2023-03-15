"use strict";
import { match } from "./util.js";

export default class Router extends HTMLElement {

  get outlet() {
    return this.querySelector("wc-outlet");
  }

  get root() {
    return window.location.pathname;
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

  connectedCallback() {
    this.innerHTML = `
  <div class="navbar-area">
    <div class="container">
      <nav class="site-navbar nav">
        <a route="/" class="site-logo">lolo_2023</a>
        <ul>
          <li><a route="/">Home</a></li>
          <li><a route="/about">About</a></li>
          <li><a route="/music">Music</a></li>
          <li><a route="/video">Video</a></li>
          <li><a route="/users">Blog</a></li>
          <li><a route="/contact">Contact</a></li>
        </ul>

        <button class="nav-toggler">
          <div></div>
        </button>
        </nav>
    </div>
    <div class="login">
    <form class="form" action="/login" method="POST">
        <input type="text" name="username" placeholder="Username" required>
        <input type="password" name="password" placeholder="Password" required>
        <input type="submit" value="LOGIN">
    </form>
</div>
  </div>
<wc-route path="/" title="Home" component="wc-home"></wc-route>
<wc-route path="/about" title="About Us" component="wc-about"></wc-route>
<wc-route path="/music" title="Music" component="wc-music"></wc-route>
<wc-route path="/video" title="Video" component="wc-video"></wc-route>
<wc-route path="/contact" title="Contact" component="wc-contact"></wc-route>
<wc-route path="/users" title="Users" component="wc-users"></wc-route>
<wc-route path="/users/:id" title="User Details" component="wc-userdetails"></wc-route>
<wc-route path="*" title="404" component="wc-notfound"></wc-route>
<wc-outlet></wc-outlet>
`;
    this.updateLinks();
    this.navigate(window.location.pathname);
    window.addEventListener("popstate", this._handlePopstate);
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
