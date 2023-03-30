let post
const userList = async (id) => {
  try {
    let response = await fetch('/client/' + id);
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
      const temp = document.getElementById("blog_temp");
      const div = temp.content.children[1]
      console.log(div)
      let cont = temp.content.cloneNode(true);
      this.appendChild(cont)
      document.getElementById('title').innerHTML = post.title
      document.getElementById('text').innerHTML = "loading..."
      const image = document.getElementById('img1');
      // image.src = `/images/${post.id}.jpg`;
      image.src = `http://drive.google.com/uc?id=${post.picUrl}`;
      image.onload = function () {
        document.getElementById('text').innerHTML = post.text;
        image.style = "background:bisque";
      }
    };
  }
}

customElements.define("wc-userdetails", UserDetails);
