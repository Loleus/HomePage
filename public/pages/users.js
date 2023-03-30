let list
let currentPage = 2;
let listPerPage = 8;
let getOffset = () => {
  return (currentPage - 1) * [listPerPage];
}

const userList = async () => {
  try {
      let response = await fetch('/client/getAll');
      let parsedList = await response.json();
      list =  parsedList
  } catch (err) {
      console.error(err)
  }
}
userList()
export default class Users extends HTMLElement {
  static get observedAttributes() { return ["page"]; }

  get page() {
    return JSON.parse(this.getAttribute("loading"));
  }
  set page(v) {
    this.setAttribute("loading", JSON.stringify(v));
  }
getEditBtns(route,id) {
  if(route.includes("client")) {
    return `
    <div style="position:absolute;display:flex;margin-top:-1.8rem; margin-left:3px;z-index:2;">
    <a class="editBtn" route="blog/edit/${id}">E</a>
    <form class="deleteBtn-form" method='POST' action='/client/${id}?_method=DELETE'>
        <button type='submit' class='btn-delete'>X
        </button>
    </form>
    </div>

    `
} else {
  return ''
}
}
  connectedCallback() {
    this.render();

  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    this.render();
  }
  incresePage() {
    this.page(--this.page)
  }
  decresePage() {
    this.page(++this.page)
  }
  render() {
    this.innerHTML = `
    <link rel="stylesheet" href="/pages/blog.css">
    <h1 class="title">Photo gallery</h1>
    <ul class="blogCards ">
    ${list.slice(getOffset(),getOffset() + listPerPage).map(e => `
    <section id="card" style="background-image: url('https://drive.google.com/thumbnail?id=${e.picUrl} ')" class="blogCard">
    <li class="blogPost">
    <a class="blogPostTitle" route="blog/${e.id}">${e.title}</a>
    <p class="blogPostText">${e.createdAt}</p>
    </li>
    ${getEditBtns(window.location.href, e.id)}
    </section>
          `).join("")}

        </ul>
        <div class="pager">
        <button onclick=""><--</button>
        <p>${currentPage}</p>
        <button onclick="")">--></button>
        </div>
    `;

  }
}

customElements.define("wc-users", Users);
