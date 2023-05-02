import { photoList} from "../../js/utils/helper.util.js";

const getEditBtns = (route, id) => {
  if (route.includes("admin")) {
    return `
    // editBtns
    `
  } else {
    return ''
  }
};
const list = await photoList();
list
  .slice(getOffset(this.page), getOffset(this.page) + listPerPage)
  .map(e => `
    <section id="card" style="background-image: url('https://drive.google.com/thumbnail?id=${e.picId} ')" class="blogCard">
      <li class="blogPost">
        <wc-router>
          <a class="blogPostTitle" route="photos/${e.id}">${e.title}</a>
          <wc-route path="/photos/:id" title="Photo Details" component="wc-photo"></wc-route>
        </wc-router>
        <p class="blogPostText">${e.createdAt}</p>
      </li>
      ${getEditBtns(window.location.href, e.id)}
    </section>
  `).join("");
  export default class Photos extends HTMLElement {

    static get observedAttributes() { return ["loading"]; }
  
    constructor() {
      super();
    };
  
    get loading() {
      return JSON.parse(this.getAttribute("loading"));
    };
  
    set loading(v) {
      this.setAttribute("loading", JSON.stringify(v));
    };
  
    async getCard() {
      this.loading = true;
      const html = await fetch("/components/photos/template.html", { mode: 'cors' })
      const htmlEdit = await fetch("/components/photos/templateEdit.html", { mode: 'cors' })
      const tempStream = await html.text()
      const tempStreamEdit = await htmlEdit.text()
      this.base = tempStream;
      this.baseEdit = tempStreamEdit;
      this.loading = false;
    };
  
    async connectedCallback() {
      await this.getCard();
      this.render();
    };
  
    htmlToElement(html) {
      const temp = document.createElement('template');
      temp.innerHTML += html;
      return temp.content;
    };
  
    render() {
      const tmp = this.htmlToElement(this.base);
      if (this.loading) {
        this.innerHTML = `Loading...`;
      } else {
        this.innerHTML = ``;
        this.appendChild(tmp.cloneNode(true));
      }
    };
  };