import {html} from "/public/components/aboutMe/template.html"
export default class About extends HTMLElement {
  static get observedAttributes() { return ["loading"]; }
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  }
  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  }
  async getCard() {
    this.loading = true;
    const temp = await fetch("/components/aboutMe/template.html", { mode: 'cors' })
    const tempStream = await temp.text()
    this.base = tempStream;
    this.loading = false;
  }

  async connectedCallback() {
    this.shadowRoot.addEventListener("click", (e) => {
      console.log(e.target)
    });
    await this.getCard();
    this.render();
  }
  htmlToElement(html) {
    const temp = document.createElement('template');
    html = html.trim();
    temp.innerHTML += html;
    return temp.content;
  }
  render() {
    const { shadowRoot } = this;
    const tmp = this.htmlToElement(html);
    if (this.loading) {
      shadowRoot.innerHTML = `Loading...`;
    } else {
      shadowRoot.innerHTML = ``;
      shadowRoot.appendChild(tmp.cloneNode(true));
    }
  }
};