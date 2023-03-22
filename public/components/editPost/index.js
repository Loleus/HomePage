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
export default class EditPost extends HTMLElement {
  static observedAttributes() {
    return ["id"];
  }

  async connectedCallback() {
    const id = this.getAttribute("id");
    console.log(id)
    if (id && id !== null) {
      let post = list.find(e => e.id === id);
      this.innerHTML = `
      <h1>Edit ${post.title}</h1>
      <form class="addForm" method='POST' action='/client/${post.id}?_method=PUT'>
      <label>
      <p>Title</p>
      <input type='text' name='title' required value="${post.title}">
  </label>
  <label>
      <p>Created at:</p>
      <input value="${post.createdAt}" type='date' name='createdAt'>
  </label>
  <label>
      <p>Last edit at:</p>
      <input value="${post.lastEditAt}" type='date' name='lastEditAt'>
  </label>
  <label>
      <p>Content:</p>
      <textarea name='text'>${post.text}</textarea>
  </label>
          <label>
          <p>Url to photo</p>
          <input value="${post.picUrl}" name='picUrl'>
      </label>
          <button type='submit'>Update</button>
      </form>
      `;
    }
  }
}

customElements.define("wc-editpost", EditPost);
