import { initer } from "/.././components/vendors/loader/index.js";

const index = (tmp) => {
  return class Youtube extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }

    async connectedCallback() {
      this.shadowRoot.innerHTML = ``;
      this.shadowRoot.appendChild(tmp.cloneNode(true));
      const scs = this.shadowRoot.getElementById('player');
      scs.style.visibility = "hidden";
      scs.setAttribute('src', "https://www.youtube.com/embed?listType=playlist&list=PLkXJmTe_aZnZncsAHK4LgkP6kkt-ataG3")
      scs.addEventListener("load", (e) => {
        scs.style.visibility = "visible";
        this.shadowRoot.removeChild(this.shadowRoot.firstElementChild);
      });
    }
  };
};

const name = "youtube";

const setup = async () => {
  return initer(index, name);
};

export default await setup();
