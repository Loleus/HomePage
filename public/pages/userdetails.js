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
          <h1 class="title blogListTitle ">${post.title}</h1>
          <p class="container">${post.text}</p>
          <img style="height:67vh;display:none" src="https://drive.google.com/uc?id=${post.picUrl}" alt="blogpic"/>
        </div>
        <form class="addForm">
        <button type="button" onclick="javascript:history.back()">Back to posts</button>
        </form>
      `;
    }
    document.querySelector('img').onload = () => {
      document.querySelector('img').style = "height:67vh;display:inline-block"
    };
  }
}

customElements.define("wc-userdetails", UserDetails);
