let list
const userList = async () => {
  try {
      let response = await fetch('/client/getAll');
      let parsedList = await response.json();
      console.log(parsedList)
      list =  parsedList
  } catch (err) {
      console.error(err)
  }
}
userList()
console.log(list)
export default class Users extends HTMLElement {
  connectedCallback() {
    const editBtn = (route) => {
      console.log(route)
      if(route.includes("client")) {
        return `
        <a class="editBtn" href='/client/form/edit/{{this.id}}'>E</a>
        <form class="deleteBtn-form" method='POST' action='/client/{{this.id}}?_method=DELETE'>
            <button type='submit' disabled="true" class='btn-delete'>X
            </button>
        </form>
        `
    } else {
      return ``
    }
  }
    this.innerHTML = `
      <div class="page">
        <h1>Posts</h1>
        <ul>
          ${list.map(e => `
          <li>
          <a route="blog/${e.id}">${e.title}</a>
          ${editBtn(window.location.href)}
          </li>`).join("")}
        </ul>
      </div>
    `;
  }
}

customElements.define("wc-users", Users);
