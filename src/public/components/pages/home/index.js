const setup = async () => {
  const resp = await fetch("/components/pages/home/template.html", { mode: 'cors' });
  const html = await resp.text();
  const base = html;
  return class Home extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" })
    }
    async connectedCallback() {
      this.render();
    };
  
    htmlToElement(html) {
      const temp = document.createElement('template');
      temp.innerHTML += html;
      return temp.content;
    };
  
    render() {
      const { shadowRoot } = this;
      const tmp = this.htmlToElement(base);
      if (this.loading) {
        shadowRoot.innerHTML = `Loading...`;
      } else {
        shadowRoot.innerHTML = ``;
        shadowRoot.appendChild(tmp.cloneNode(true));
      }
    };
  };
};

export default await setup();
