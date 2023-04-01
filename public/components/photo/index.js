let photo
const photoList = async (id) => {
  try {
    let response = await fetch('/admin/' + id);
    let parsedList = await response.json();
    photo = parsedList
    console.log(photo)
  } catch (err) {
    console.error(err)
  }
}

export default class Photo extends HTMLElement {
  static observedAttributes() {
    return ["id"];
  }

  async connectedCallback() {
    const id = this.getAttribute("id");
    await photoList(id)
    console.log(id)

    if (id && id !== null) {
      const temp = document.getElementById("photo_temp");
      const div = temp.content.children[1]
      console.log(div)
      let cont = temp.content.cloneNode(true);
      this.appendChild(cont)
      document.getElementById('title').innerHTML = photo.title
      document.getElementById('text').innerHTML = "loading..."
      const image = document.getElementById('img1');
      // image.src = `/images/${post.id}.jpg`;
      image.src = `http://drive.google.com/uc?id=${photo.picId}`;
      image.onload = function () {
        document.getElementById('text').innerHTML = photo.text;
        image.style = "background:bisque";
      }
    };
  }
}

