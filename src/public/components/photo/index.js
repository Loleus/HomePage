import { photoList } from "../../js/utils/helper.util.js";

export default class Photo extends HTMLElement {

  static observedAttributes() {
    return ["id"];
  }

  loadPic(photo) {
    let text = document.getElementById('text')
    document.getElementById('title').innerHTML = photo.title
    text.innerHTML = "loading..."
    const image = document.getElementById('img1');
    image.src = `http://drive.google.com/uc?id=${photo.picId}`;
    image.onload = function () {
      text.innerHTML = photo.text;
      image.style = "background:bisque";
    }
  };

  async connectedCallback() {
    let photo = await photoList(this.id);
    if (this.id && this.id !== null) {
      const temp = document.getElementById("photo_temp");
      let cont = temp.content.cloneNode(true);
      this.appendChild(cont);
      this.loadPic(photo);
    };
  };
};
