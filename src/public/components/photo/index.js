import { photoList } from "../../js/utils/helper.util.js";

export default class Photo extends HTMLElement {

  static observedAttributes() {
    return ["id"];
  };

  async render() {
    let allArr = await photoList();
    let photo = await photoList(this.id);
    const photoIdList = allArr.map((x) => {
      return x.id;
    });
    const indexOfPhoto = await photoIdList.indexOf(photo.id)
    const founded = allArr[indexOfPhoto];
    console.log(await photoIdList)
    console.log(indexOfPhoto)
    this.id=indexOfPhoto - 1;
    console.log(founded);
    console.log(this.id);
    let text = document.getElementById('text');
    document.getElementById('title').innerHTML = photo.title;
    text.innerHTML = "loading...";
    const image = document.getElementById('img1');
    image.src = `http://drive.google.com/uc?id=${photo.picId}`;
    image.onload = function () {
      text.innerHTML = photo.text;
      image.style = "background:bisque";
    };
  };

  async connectedCallback() {
    if (this.id && this.id !== null) {
      const temp = document.getElementById("photo_temp");
      let cont = temp.content.cloneNode(true);
      this.appendChild(cont);
      this.render();
    };
  };
};
