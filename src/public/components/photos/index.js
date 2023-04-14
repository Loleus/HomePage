import { getOffset, photoList, listPerPage } from "../../js/utils/helper.util.js";

const list = await photoList();
const photoListL = list;
const lastPage = Math.ceil(photoListL.length/listPerPage);
export default class Photos extends HTMLElement {

  static get observedAttributes() { return ["page"] };

  get page() {
    return JSON.parse(this.getAttribute("page"));
  };

  set page(v) {
    this.setAttribute("page", JSON.stringify(v));
  };

  getEditBtns(route, id) {
    if (route.includes("admin")) {
      return `
    <link rel="stylesheet" href="/components/photos/editBtns.css">
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
  };

  buttonStates(e) {
    let id = e.target.id
    e.preventDefault();
    switch (id) {
      case "inc":
        (this.page == lastPage) ? this.page : this.page += 1;
        break;

      case "dec":
        (this.page == 1) ? this.page = this.page  : this. page -= 1;
        break;

      default:
        break;
    }
  };

  async connectedCallback() {
    this.render();
    this.page = 1;
    const btns = this.querySelectorAll('button');
    this.addEventListener("click", (e) => {
      this.buttonStates(e)
    }, true);
  };

  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  };

  render() {
    this.innerHTML = `
      <link rel="stylesheet" href="/components/photos/style.css">
      <h1 class="title">Shots</h1>
      <ul class="blogCards ">
    ${list
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
          ${this.getEditBtns(window.location.href, e.id)}
        </section>
      `).join("")}
        <div class="pager">
          <button id="dec"><--</button>
          <p>${this.page}</p>
          <button id="inc")">--></button>
        </div>
      </ul>
    `
  };
};
