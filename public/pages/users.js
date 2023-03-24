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
    <ul class="blogCards container">
    ${list.map(e => `
    <section class="blogCard container">
    <li class="blogPost">
    <a class="blogListTitle" route="blog/${e.id}">${e.title}</a>
    <p>${e.text}</p>
    ${editBtn(window.location.href, e.id)}
    </li>
    <img src="https://drive.google.com/thumbnail?id=${e.picUrl}" alt="blogpic"/ >
    </section>
          `).join("")}
        </ul>
    `;
  }
}

customElements.define("wc-users", Users);
