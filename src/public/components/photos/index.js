import { getOffset, photoList, listPerPage } from "../../js/utils/helper.util.js";

const list = await photoList();
const photoListL = list;
const lastPage = Math.ceil(photoListL.length / listPerPage);

export default class Photos extends HTMLElement {

  static get observedAttributes() { return ["loading", "page"]; }

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  };

  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  };

  get page() {
    return JSON.parse(this.getAttribute("page"));
  };

  set page(v) {
    this.setAttribute("page", JSON.stringify(v));
  };

  constructor() {
    super();
  };


  buttonStates(e) {
    let id = e.target.id
    e.preventDefault();
    switch (id) {
      case "inc":
        (this.page == lastPage) ? this.page : this.page += 1;
        break;
      case "dec":
        (this.page == 1) ? this.page = this.page : this.page -= 1;
        break;

      default:
        break;
    }
  };

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  };

  async getCard() {
    this.loading = true;
    const html = await fetch("/components/photos/template.html", { mode: 'cors' })
    const tempStream = await html.text()
    this.base = tempStream;
    this.loading = false;
  };

  async connectedCallback() {
    this.page = 1;
    this.addEventListener("click", (e) => {
      this.buttonStates(e)
    }, true);
    await this.getCard();
    this.render();
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