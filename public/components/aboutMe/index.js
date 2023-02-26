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
    this.tmp = document.createElement('template');
    this.tmp.innerHTML += this.base
    this.loading = false;
  }
  
  async connectedCallback() {
    this.shadowRoot.addEventListener("click", (e) => {
      console.log(e.target)
    });
    await this.getCard();
    this.render();
  }
  disconnectedCallback() { }

  attributeChangedCallback(attrName, oldVal, newVal) {

  }
  render() {
console.log("tutej")
    if (this.loading) {
      this.shadowRoot.innerHTML = `Loading...`;
    } else {
      this.shadowRoot.innerHTML = ``;
      this.shadowRoot.appendChild(this.tmp.content.cloneNode(true));
    }
  }
};