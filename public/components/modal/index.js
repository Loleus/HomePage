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
  getContent() {
    let content
    if (this.index == "about" ) {
      content = `<about-card></about-card>`
    }
    if (this.index == "music") {
      content =  `<soundcloud-card></soundcloud-card>`
    }
    if (this.index == "video" ) {
      content = `<youtube-card></youtube-card>`
    }
    if (this.index == "blog") {
      content =  `<blog-card></blog-card>`
    }
    return content
  }
  render() {

    if (this.loading) {
      this.shadowRoot.innerHTML = `Loading...`;
    } else {
      if(this.visibility) {
        this.shadowRoot.innerHTML = ``;
        this.shadowRoot.appendChild(this.tmp.content.cloneNode(true));
        this.shadowRoot.getElementById('content').innerHTML =  this.getContent()
      } else {
        this.shadowRoot.innerHTML = ``;
        this.shadowRoot.innerHTML = `
        <style>
        button {
          pointer-events: auto;
          border-radius: 0.5em;
          cursor: pointer;
          font-size: 0.6em;
          box-shadow: 0px 0px 6px -1px #b37e0e;
          border: none;
          background: #333b;
          color: #a5a5a5;
          padding: 5px 16px 7px;
          text-shadow: 1px 2px 1px #272727;
          color: #d6b212;
          transition: box-shadow 0.24s linear;
          margin: 0 1em;
        }
        
        button:hover {
          box-shadow: 0px 0px 3px 0px rgb(204, 11, 11);
          color: #8fcc00;
        }
        @media only screen and (max-width: 1020px) {
          button {
            display:block;
            margin: 0 auto;
          }
        }</style>
        <button>${this.labelText}</button>
        `;
      }

    }
  }
}
