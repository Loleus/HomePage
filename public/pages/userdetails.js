let list
const userList = async () => {
  try {
    let response = await fetch('client/getAll');
    let parsedList = await response.json();
    console.log(parsedList)
    list = parsedList
  } catch (err) {
    console.error(err)
  }
}
userList()
console.log(list)
export default class UserDetails extends HTMLElement {
  static observedAttributes() {
    return ["id"];
  }

  connectedCallback() {
    const id = this.getAttribute("id");
    console.log(id)
    if (id && id !== null) {
      let post = list.find(e => e.id === id);
      this.innerHTML = `
        <div class="page">
          <h1>Post Details</h1>
          <div>${post.title}</div>
          <div>${post.text}</div>
          <div>${post.picUrl}</div>
        </div>
      `;
    }
  }
}

customElements.define("wc-userdetails", UserDetails);
