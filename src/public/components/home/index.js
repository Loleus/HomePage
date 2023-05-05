export default class Home extends HTMLElement {

  static get observedAttributes() { return ["loading"]; }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  };

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  };

  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  };

  async getCard() {
    this.loading = true;
    const html = await fetch("/components/home/template.html", { mode: 'cors' })
    const tempStream = await html.text()
    this.base = tempStream;
    this.loading = false;
  };

  async connectedCallback() {
    await this.getCard();
    this.render();
  };

  htmlToElement(html) {
    const temp = document.createElement('template');
    temp.innerHTML += html;
    return temp.content;
  };

  render() {
    const tmp = this.htmlToElement(this.base);
    if (this.loading) {
      this.shadowRoot.innerHTML = `<p>Loading...</p>`;
    } else {
      this.shadowRoot.innerHTML = ``;
      this.shadowRoot.appendChild(tmp.cloneNode(true));
    }
  };
};