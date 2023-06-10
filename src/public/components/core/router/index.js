import { match } from "./util.js";
import init from "/components/init.js";
import listeners from "/components/core/menu/listeners.js";

export default class Router extends HTMLElement {

  get outlet() {
    return document.querySelector(".wc-outlet");
  }

  get root() {
    return window.location.pathname;
  }

  get anchors() {
    const anch = this.querySelectorAll("a[route]");
    return anch
  }

  get routes() {
    return Array.from(this.querySelectorAll("wc-route"))
      .filter(node => node.parentNode === this)
      .map(r => ({
        path: r.getAttribute("path"),
        title: r.getAttribute("title"),
        component: r.getAttribute("component"),
        // Bundle path if lazy loading the component
        resourceUrl: r.getAttribute("resourceUrl")
      }));
  }
  static get observedAttributes() { return ["loading"]; }

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  };

  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  };

  async getCard() {
    this.loading = true;
    const html = await fetch("/components/core/router/template.html", { mode: 'cors' })
    const tempStream = await html.text()
    this.base = tempStream;
    this.loading = false;
  };

  htmlToElement(html) {
    const temp = document.createElement('template');
    temp.innerHTML += html;
    return temp.content;
  };

  render() {
    const tmp = this.htmlToElement(this.base);
    if (this.loading) {
      this.innerHTML = `<p>Loading...</p>`;
    } else {
      this.innerHTML = ``;
      this.appendChild(tmp.cloneNode(true));
      listeners();
    }
  };

  async connectedCallback() {
    await this.getCard();
    this.render();
    init;
    this.updateLinks();
    // this.anchors[1] ? this.anchors[0].style.color = "gold" : null
    this.navigate(window.location.pathname);
    window.addEventListener("popstate", this._handlePopstate);
    if (window.history.replaceState) {
      window.history.replaceState(null, null, window.location.href);
    }
  }

  disconnectedCallback() {
    window.removeEventListener("popstate", this._handlePopstate);
  }

  _handlePopstate = () => {
    this.navigate(window.location.pathname);
  };

  updateLinks() {
    this.anchors.forEach(link => {
      const target = link.getAttribute("route");
      link.setAttribute("href", target);
      link.onclick = e => {
        e.preventDefault();
        this.navigate(target);
        this.anchors.forEach(link => {
          link.style.color = ""
        });
       !e.target.classList.contains('site-logo') ? e.target.style.color = "gold" : null;
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
