import { initer } from "/.././components/vendors/loader/index.js";

const index = (tmp) => {
  return class Soundcloud extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
      this.shadowRoot.innerHTML = ``;
      this.shadowRoot.appendChild(tmp.cloneNode(true));
      const scs = this.shadowRoot.getElementById('scwidget');
      scs.style.visibility = "hidden";
      scs.setAttribute('src', "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/loleus/")
      scs.addEventListener("load", (e) => {
        scs.style.visibility = "visible";
        this.shadowRoot.removeChild(this.shadowRoot.firstElementChild);
      });
    }
  };
};

const name = "soundcloud";

const setup = async () => {
  return initer(index, name);
};

export default await setup();
