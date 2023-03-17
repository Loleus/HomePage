export default class Menu extends HTMLElement {
  static get observedAttributes() { return ["loading"]; }

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  }
  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  }
  async getCard() {
    this.loading = true;
    const html = await fetch("/components/menu/template.html", { mode: 'cors' })
    const tempStream = await html.text()
    this.base = tempStream;
    this.loading = false;
  }

  async connectedCallback() {
    await this.getCard();
    this.render();
  }
  htmlToElement(html) {
    const temp = document.createElement('template');
    temp.innerHTML += html;
    return temp.content;
  }
  render() {
    const tmp = this.htmlToElement(this.base);
    if (this.loading) {
      this.innerHTML = `Loading...`;
    } else {
      this.innerHTML = ``;
      this.appendChild(tmp.cloneNode(true));
    }
  }
};