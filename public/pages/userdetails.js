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

export default class UserDetails extends HTMLElement {
  static observedAttributes() {
    return ["id"];
  }

  connectedCallback() {
    const id = this.getAttribute("id");
    if (id && id !== null) {
      const user = list.find(e => e.id === parseInt(id)) || {};
      this.innerHTML = `
        <div class="page">
          <h1>User Details</h1>
          <div>${user.title}</div>
          <div>${user.text}</div>
          <div>${user.picUrl}</div>
        </div>
      `;
    }
  }
}

customElements.define("wc-userdetails", UserDetails);
