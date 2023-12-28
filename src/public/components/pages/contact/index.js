import { initer } from "/.././components/vendors/loader/index.js";

const index = (tmp) => {
  return class Contact extends HTMLElement {
  
    async connectedCallback() {
      this.innerHTML = ``;
      this.appendChild(tmp.cloneNode(true));
    }
  }
}
const name = "contact"

const setup = async () => {
  return initer(index, name);
};

export default await setup();
