import { initer } from "/.././components/vendors/loader/index.js";

const index = (tmp) => {
return class Repos extends HTMLElement {

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

  async getRepos(url) {
    this.loading = true;
    const response = await fetch(url, { mode: 'cors' });
    const json = await response.json();
    this.reps = json;
    this.setRepos();
    this.loading = false;
  };

  async connectedCallback() {
    await this.getRepos("https://api.github.com/users/Loleus/repos");
  };

  disconnectedCallback() {
    tmp.getElementById("repos").innerHTML = ``;
  }

  setRepos() {
    this.reps.map(repo => {
      if (repo.name != "loleus.github.io" && !(repo.description.includes('#'))) {
        tmp.getElementById("repos").innerHTML += `
          <tr>
            <td id="name" style="background-image:url('https://loleus.github.io/${repo.name}/bogp.jpg')"><a target="_blank" href="https://loleus.github.io/${repo.name}">${repo.name}</a></td>
            <td style="padding: 0 1vh" id="type">${repo.description}</td>
            <td style="padding: 0 1vh" id="lang">${repo.language}</td>
          </tr>
        `
      };
    }).join("")
  };

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  };

  render() {
    if (this.loading) {
      this.shadowRoot.innerHTML = `<wc-spinner></wc-spinner>`;
    } else {
      this.shadowRoot.innerHTML = ``;
      this.shadowRoot.appendChild(tmp.cloneNode(true));
    }
  };
};
};

const name = "repos";

const setup = async () => {
  return initer(index, name);
};

export default await setup();