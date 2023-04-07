let list
let listPerPage = 6;
let getOffset = (page) => {
  return (page - 1) * [listPerPage];
}

const photoList = async () => {
  try {
    let response = await fetch('/admin/getAll');
    let parsedList = await response.json();
    list = parsedList

  } catch (err) {
    console.error(err)
  }
}
photoList()
export default class Photos extends HTMLElement {
  static get observedAttributes() { return ["page"]; }

  get page() {
    return JSON.parse(this.getAttribute("page"));
  }
  set page(v) {
    this.setAttribute("page", JSON.stringify(v));
  }
  getEditBtns(route, id) {
    if (route.includes("admin")) {
      return `
      <style>

button.btn-delete {
  background: none;
  border: none;
  font-size: 1.4rem;
  padding: 0;
}

form.deleteBtn-form {
  
  background: red;
  padding: 0;
  margin: 0;
  cursor: pointer;
  width: 1.4rem;
  border-radius: 3px;
}

a.editBtn {
  width: 1.4rem;
  background: rgb(40, 207, 40);
  font-size: 1.4rem;
  padding: 0 5px;
  border-radius: 3px;
  color: #00112c;
}
div#edit {
  position:absolute;
  display:flex;
  margin-top:-1.9rem;
  margin-left:3px;
  z-index:2;
  background:white;
  padding:2px;
}
      </style>
    <div id="edit">
    <wc-router>
    <a class="editBtn" route="photos/edit/${id}">E</a>
    <wc-route path="/photos/edit/:id" title="Edit Post" component="wc-editphoto"></wc-route>
    </wc-router>
    <form class="deleteBtn-form" method='POST' action='/admin/${id}?_method=DELETE'>
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
    this.page = 1;
    this.addEventListener("click", (e) => {
      e.preventDefault();
      switch (e.target.id) {
        case "inc":
          this.page = this.page + 1;
          break;

        case "dec":
          this.page = this.page - 1;
          break;

        default:
          console.log(e.target)
          break;
      }
    }, true);
    setTimeout(() => {
      document.getElementById('dec').disabled = true
      document.getElementById('inc').disabled = false
    });
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    setTimeout(() => {

      if (this.page == 1) {
        document.getElementById('dec').disabled = true
        document.getElementById('inc').disabled = false
      } else {
        document.getElementById('inc').disabled = true;
        document.getElementById('dec').disabled = false
      }

    });
    this.render();
  }
  render() {
    this.innerHTML = `
    <link rel="stylesheet" href="/components/photos/style.css">
    <h1 class="title">Shots</h1>
    <ul class="blogCards ">
    ${list.slice(getOffset(this.page), getOffset(this.page) + listPerPage).map(e => `
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
  }
}

