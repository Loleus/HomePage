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
      <div class="page">
        <ul>
          ${list.map(e => `
          <h1><a route="blog/${e.id}">${e.title}</h1></a>
          <li class="container">
          <p>${e.text}</p>
          ${editBtn(window.location.href, e.id)}
          <img src="https://drive.google.com/thumbnail?id=${e.picUrl}" alt="blogpic"/  >
          </li>`).join("")}
        </ul>
      </div>
    `;
  }
}

customElements.define("wc-users", Users);
