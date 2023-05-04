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
    this.querySelector("#page").innerHTML = this.page
  };

  getEditBtns(route, id) {
      if (route.includes("admin")) {
        return `
        <link rel="stylesheet" href="/components/photo/editBtns.css">
        <div id="edit">
          <wc-router>
            <a class="editBtn" route="photos/edit/${id}">E</a>
            <wc-route path="/photos/edit/:id" title="Edit Post" component="wc-editphoto"></wc-route>
          </wc-router>
          <form class="deleteBtn-form" method='POST' action='/admin/${id}?_method=DELETE'>
           <button type='submit' class='btn-delete'>X</button>
          </form>
        </div>
        `
      } else {
        return ''
      }
  }
  getPhotoCard(e) {
    return `
    <section id="card" style="background-image: url('https://drive.google.com/thumbnail?id=${e.picId} ')" class="blogCard">
      <li class="blogPost">
        <wc-router>
          <a class="blogPostTitle" route="photos/${e.id}">${e.title}</a>
          <wc-route path="/photos/:id" title="Photo Details" component="wc-photo"></wc-route>
        </wc-router>
        <p class="blogPostText">${e.createdAt}</p>
      </li>
      ${thisgetEditBtns(window.location.href, e.id)}
    </section>
  `
  }
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
      const gal = document.getElementById("gal");
      const page = document.getElementById("page");
      gal.innerHTML += photoListL
        .slice(getOffset(this.page), getOffset(this.page) + listPerPage)
        .map(e => this.getPhotoCard(e, this.page)).join("");
      page.innerText = this.page;
    }
  };
};