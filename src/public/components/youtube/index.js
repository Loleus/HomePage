export default class Youtube extends HTMLElement {
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
      const html = await fetch("/components/youtube/template.html", { mode: 'cors' })
      const tempStream = await html.text()
      this.base = tempStream;
      this.tmp = this.htmlToElement(this.base);
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
      temp.innerHTML += html;
      return temp.content;
    }
    render() {
      const { shadowRoot } = this;
      if (this.loading) {
        shadowRoot.innerHTML = `<wc-spinner></wc-spinner>`;
      } else {
        shadowRoot.innerHTML = ``;
        shadowRoot.appendChild(this.tmp.cloneNode(true));
      }
    }
  };