const setup = async () => {
  const resp = await fetch("/components/pages/home/template.html", {mode: "cors",});
  const html = await resp.text();
  const base = html;

  let htmlToElement = () => {
    const temp = document.createElement("template");
    temp.innerHTML += base;
    return temp.content;
  };

  return class Home extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
      const tmp = htmlToElement(base);
      this.shadowRoot.innerHTML = ``;
      this.shadowRoot.appendChild(tmp.cloneNode(true));
    }
  };
};

export default await setup();
