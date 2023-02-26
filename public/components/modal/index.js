export default class Modal extends HTMLElement {
  static get observedAttributes() { return [ "visibility", "label-text", "id"]; }
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
    const temp = await fetch("./components/modal/template.html", { mode: 'cors' })
    console.log(temp)
    const tempStream = await temp.text()
    this.base = tempStream;
    this.tmp = document.createElement('template');
    this.tmp.innerHTML += this.base
    console.log(this.tmp)
    this.loading = false;

  }
  get labelText() {
    return this.getAttribute('label-text');
  }
  get index() {
    return this.getAttribute('id');
  }
  set labelText(value) {
    if (value) {
      this.setAttribute('label-text', value);
    }
  }
  get visibility() {
    return JSON.parse(this.getAttribute("visibility"));
  }
  set visibility(v) {
    this.setAttribute("visibility", JSON.stringify(v));
  }
  async connectedCallback() {
    this.textContent = this.labelText;
    this.shadowRoot.addEventListener("click", (e) => {
      this.visibility = !this.visibility
      console.log(this.index)
      window.scrollTo(0, 0);
    });
    this.visibility = false
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
      if(this.visibility) {
        this.shadowRoot.innerHTML = ``;
        this.shadowRoot.appendChild(this.tmp.content.cloneNode(true));
      } else {
        this.shadowRoot.innerHTML = ``;
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="/components/modal/button.css">
        <button>${this.labelText}</button>
        `;
      }

    }
  }
}
