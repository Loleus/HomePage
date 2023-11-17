import { initer } from "/.././components/vendors/loader/index.js";

const index = (tmp) => {
  return class Contact extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
  
    async connectedCallback() {
      this.shadowRoot.innerHTML = ``;
      this.shadowRoot.appendChild(tmp.cloneNode(true));
    }
  }
}
const name = "contact"

const setup = async () => {
  return initer(index, name);
};

export default await setup();
