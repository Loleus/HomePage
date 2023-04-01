let list
let listPerPage = 6;
let getOffset = (page) => {
  return (page - 1) * [listPerPage];
}

const userList = async () => {
  try {
      let response = await fetch('/admin/getAll');
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
    return JSON.parse(this.getAttribute("page"));
  }
  set page(v) {
    this.setAttribute("page", JSON.stringify(v));
  }
getEditBtns(route,id) {
  if(route.includes("admin")) {
    return `
    <div style="position:absolute;display:flex;margin-top:-1.8rem; margin-left:3px;z-index:2;">
    <wc-router>
    <a class="editBtn" route="blog/edit/${id}">E</a>
    <wc-route path="/blog/edit/:id" title="Edit Post" component="wc-editpost"></wc-route>
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
      switch(e.target.id) {
        case "inc":
          this.page = this.page + 1;
          break;
        
        case "dec":
          this.page = this.page - 1;
          break;
        
        default :
          console.log(e.target)
          break;
      }
    },true);
setTimeout(() => {
  document.getElementById('dec').disabled = true 
  document.getElementById('inc').disabled = false
});
  }
  attributeChangedCallback(attrName, oldVal, newVal) {
    setTimeout(() => {
 
      if(this.page==1){
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
    <link rel="stylesheet" href="components/pages/blog.css">
    <h1 class="title">Photo gallery</h1>
    <ul class="blogCards ">
    ${list.slice(getOffset(this.page),getOffset(this.page) + listPerPage).map(e => `
    <section id="card" style="background-image: url('https://drive.google.com/thumbnail?id=${e.picUrl} ')" class="blogCard">
    <li class="blogPost">
    <wc-router>
    <a class="blogPostTitle" route="blog/${e.id}">${e.title}</a>
    <wc-route path="/blog/:id" title="Post Details" component="wc-userdetails"></wc-route>
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

customElements.define("wc-users", Users);
