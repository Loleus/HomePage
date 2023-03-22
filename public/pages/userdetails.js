let post
const userList = async (id) => {
  try {
    let response = await fetch('/client/'+id);
    let parsedList = await response.json();
    post = parsedList
  } catch (err) {
    console.error(err)
  }
}

console.log(post)
export default class UserDetails extends HTMLElement {
  static observedAttributes() {
    return ["id"];
  }

  async connectedCallback() {
    const id = this.getAttribute("id");
    await userList(id)
    console.log(id)
    if (id && id !== null) {
      this.innerHTML = `
        <div class="page">
          <h1>Post Details</h1>
          <div>${post.title}</div>
          <div>${post.text}</div>
          <img src="${post.picUrl}" alt="blogpic"/  >
        </div>
        <form class="addForm">
        <button type="button" onclick="javascript:history.back()">Back to posts</button>
        </form>
      `;
    }
  }
}

customElements.define("wc-userdetails", UserDetails);
