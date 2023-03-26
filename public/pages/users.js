let list
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
  connectedCallback() {
    const editBtn = (route,id) => {
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
    this.innerHTML = `
    <link rel="stylesheet" href="/pages/blog.css">
    <h1 class="title">Photo gallery</h1>
    <ul class="blogCards ">
    ${list.map(e => `
    <section style="background-image: url('https://drive.google.com/thumbnail?id=${e.picUrl} ')" class="blogCard">
    <li class="blogPost">
    <a class="blogPostTitle" route="blog/${e.id}">${e.title}</a>
    <p class="blogPostText">${e.createdAt}</p>
    </li>
    ${editBtn(window.location.href, e.id)}
    </section>
          `).join("")}
        </ul>
    `;
  }
}

customElements.define("wc-users", Users);
