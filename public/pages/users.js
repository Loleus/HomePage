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
        <a class="editBtn" route="blog/edit/${id}">E</a>
        <form class="deleteBtn-form" method='POST' action='/client/${id}?_method=DELETE'>
            <button type='submit' class='btn-delete'>X
            </button>
        </form>
        `
    } else {
      return ``
    }
  }
    this.innerHTML = `

      <h1 class="title">My Photo Blog</h1>
        <ul>
          ${list.map(e => `
          <a class="blogListTitle" route="blog/${e.id}">${e.title}</a>
          <li class="container blogPost">
          <p>${e.text}</p>
          ${editBtn(window.location.href, e.id)}
          <img src="https://drive.google.com/thumbnail?id=${e.picUrl}" alt="blogpic"/  >
          </li>`).join("")}
        </ul>
    `;
  }
}

customElements.define("wc-users", Users);
