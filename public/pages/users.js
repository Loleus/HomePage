let list
const userList = async () => {
  try {
      let response = await fetch('/client/getAll');
      let parsedList = await response.json();
      console.log(parsedList)
      list = parsedList
  } catch (err) {
      console.error(err)
  }
}
userList()
console.log(list)
export default class Users extends HTMLElement {
  connectedCallback() {

    this.innerHTML = `
      <div class="page">
        <h1>Posts</h1>
        <ul>
          ${list
            .map(e => `<li><a route="/blog/${e.id}">${e.title}</a></li>`)
            .join("")}
        </ul>
      </div>
    `;
  }
}

customElements.define("wc-users", Users);
