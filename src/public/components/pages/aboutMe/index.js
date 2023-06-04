export default class About extends HTMLElement {

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
    const html = await fetch("/components/pages/aboutMe/template.html", { mode: 'cors' })
    const tempStream = await html.text()
    this.base = tempStream;
    this.loading = false;
  };

  async connectedCallback() {
    await this.getCard();
    this.render();
    this.animate();
  };

  htmlToElement(html) {
    const temp = document.createElement('template');
    temp.innerHTML += html;
    return temp.content;
  };

  render() {
    const { shadowRoot } = this;
    const tmp = this.htmlToElement(this.base);
    if (this.loading) {
      shadowRoot.innerHTML = `Loading...`;
    } else {
      shadowRoot.innerHTML = ``;
      shadowRoot.appendChild(tmp.cloneNode(true));
    }
  };

  animate() {
    const message = `  Hi, here Łukasz Kamiński aka Lolo. I'm passionate about programming web aplications, taking pictures and mixing sound. I have been a CNC operator for several years.`;
    const container = this.shadowRoot.querySelector('#target');
    let n;
    function rerun() {
      container.textContent = '';
      n = 0;
      typist(message, container);
    };
    rerun();
    function interval(letter) {
      if (letter == ';' || letter == '.' || letter == ',') {
        return Math.floor((Math.random() * 500) + 500);
      } else {
        return Math.floor((Math.random() * 130) + 5);
      }
    }
    function typist(text, target) {
      if (typeof (text[n]) != 'undefined') {
        target.textContent += text[n];
      }
      n++;
      if (n < text.length) {
        setTimeout(function () {
          typist(text, target)
        }, interval(text[n - 1]));
      }
      if (n === message.length) {
        console.log("interwal");
        // return setTimeout(() => { rerun() }, 2000)
      }
    }
  }
};