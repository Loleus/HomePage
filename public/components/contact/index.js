export default class Contact extends HTMLElement {
  static get observedAttributes() { return [ "loading"]; }
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
  async getModal() {
    this.loading = true;
    const temp = await fetch("./components/contact/template.html", { mode: 'cors' })
    const tempStream = await temp.text()
    this.base = tempStream;
    this.tmp = document.createElement('template');
    this.tmp.innerHTML += this.base
    this.loading = false;

  }
  async connectedCallback() {
    await this.getModal();

  }
  disconnectedCallback() { }

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }

  render() {

    if (this.loading) {
      this.shadowRoot.innerHTML = `Loading...`;
    } else {
        this.shadowRoot.innerHTML = ``;
        this.shadowRoot.appendChild(this.tmp.content.cloneNode(true));

    }
  }
}
