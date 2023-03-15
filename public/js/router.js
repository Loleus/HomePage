"use strict";
import { match } from "./util.js";

export default class Router extends HTMLElement {

  get outlet() {
    return this.querySelector("wc-outlet");
  }

  get root() {
    return window.location.pathname;
  }

  /**
   * Get all routes from the direct wc-route child element.
   * The document title can be updated by providing an
   * title attribute to the wc-route tag
   */
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
    this.innerHTML =   `

    <div class="navbar-area">
    <div class="container">
      <nav class="site-navbar nav">
        <a route="/" class="site-logo">lolo_2023</a>
        <ul>
          <li><a route="/">Home</a></li>
          <li><a route="/about">About</a></li>
          <li><a route="/music">Music</a></li>
          <li><a route="/users">Blog</a></li>
          <li><a route="/misc">Misc</a></li>
        </ul>

        <button class="nav-toggler">
          <div></div>
        </button>
        </nav>
    </div>
  </div>

<wc-route path="/" title="Home" component="wc-home"></wc-route>
<wc-route path="/about" title="About Us" component="wc-about"></wc-route>
<wc-route path="/music" title="music Us" component="wc-music"></wc-route>
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
    /**
     * Find all child link elements with route attribute to update the
     * href with route attribute value.
     *
     * Add custom click event handler to prevent the default
     * behaviour and navigate to the registered route onclick.
     */
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

  /**
   * Update the DOM under outlet based on the active
   * selected route.
   */
  update() {
    const {
      component,
      title,
      params = {},
      resourceUrl = null
    } = this.activeRoute;

    if (component) {
      // Remove all child nodes under outlet element
      while (this.outlet.firstChild) {
        this.outlet.removeChild(this.outlet.firstChild);
      }

      const updateView = () => {
        const view = document.createElement(component);
        document.title = title || document.title;
        for (let key in params) {
          /**
           * all dynamic param value will be passed
           * as the attribute to the newly created element
           * except * value.
           */
          if (key !== "*") view.setAttribute(key, params[key]);
        }

        this.outlet.appendChild(view);
        // Update the route links once the DOM is updated
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
