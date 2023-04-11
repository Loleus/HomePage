import { getOffset, photoList, listPerPage } from "../../js/utils/helper.util.js";

const list = await photoList();

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

  buttonStates(id) {
    switch (id) {
      case "inc":
        this.page = this.page + 1;
        break;

      case "dec":
        this.page = this.page - 1;
        break;

      default:

        break;
    }
  };

  async connectedCallback() {
    this.render();
    this.dec = document.getElementById('dec');
    this.inc = document.getElementById('inc');
    this.page = 1;
    this.addEventListener("click", (e) => {
      e.preventDefault();
      this.buttonStates(e.target.id)
    }, true);
    setTimeout(() => {
      this.dec.disabled = true
      this.inc.disabled = false
    });
  };

  attributeChangedCallback(attrName, oldVal, newVal) {
    setTimeout(() => {
      if (this.page == 1) {
        this.dec.disabled = true
        this.inc.disabled = false
      } else {
        this.dec.disabled = true;
        this.inc.disabled = false
      }

    });
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
