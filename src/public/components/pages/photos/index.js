import { getOffset, photoList, listPerPage } from "./utils/helper.util.js";
const list = await photoList();
const photoListL = list;
const lastPage = Math.ceil(photoListL.length / listPerPage);
let currPic;
let photoParams;
let index;
export default class Photos extends HTMLElement {

  static get observedAttributes() { return ["loading", "page"]; }

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  };

  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  };

  get page() {
    return JSON.parse(this.getAttribute("page"));
  };

  set page(v) {
    this.setAttribute("page", JSON.stringify(v));
  };

  buttonStates(e) {
    let id = e.target.id
    e.preventDefault();
    let image = document.querySelector('.show');
    switch (id) {
      case "inc":
        (this.page == lastPage) ? this.page  = 0 : this.page += 1;
        break;
      case "dec":
        (this.page == 1) ? this.page = lastPage : this.page -= 1;
        break;
      case "prev":
        index == 0 ? index = photoListL.length-1 : index -= 1;
        currPic = photoListL[index].picId
        this.showing(image)
        break;
      case "next":
        index == photoListL.length-1 ? index = 0 : index += 1;
        currPic = photoListL[index].picId
        this.showing(image)
        break;

      default:
        break;
    }
    console.log(photoListL)
    
  };
showing(image) {
  let pic = `http://drive.google.com/uc?id=${currPic}`;
  image.style = `background-image:url("${pic}"); display:block`;
}
  attributeChangedCallback(attrName, oldVal, newVal) {
    attrName == "page" ? this.updatePage() : this.render();
  };

  htmlToElement(html) {
    const temp = document.createElement('template');
    temp.innerHTML += html;
    return temp.content;
  };

  async getCard() {
    this.loading = true;
    const html = await fetch("/components/pages/photos/template.html", { mode: 'cors' })
    const tempStream = await html.text()
    this.base = tempStream;
    this.tmp = this.htmlToElement(this.base);
    this.loading = false;
  };

  async connectedCallback() {
    this.addEventListener("click", (e) => {
      e.target.parentElement.picid ? currPic = e.target.parentElement.picid : null;
      e.target.parentElement.picid ? index = photoListL.map(function(e) { return e.picId; }).indexOf(`${currPic}`) : null
 
      this.buttonStates(e)
    }, true);
    await this.getCard();
  };

  getPhotoCard(e) {
    let {picId, id, title, createdAt, text} = e;
    return `
    <wc-card id="${id}" picid="${picId}" title="${title}" createdat="${createdAt}" text="${text}"></wc-card>
    `
  }

  async updatePage() {
    this.loading = true;
    const page = this.tmp.getElementById("page");
    page.innerText = this.page;
    const gallery = this.tmp.getElementById("gal");
    photoParams = await photoListL.slice(getOffset(this.page), getOffset(this.page) + listPerPage);
   const setCards = photoParams.map((e,index) => this.getPhotoCard(e, index));
    gallery.innerHTML = setCards.join("");
    this.loading = false;
  }

  render() {
    if (this.loading) {
      this.innerHTML = `<wc-spinner></wc-spinner>`;
    } else {
      this.innerHTML = ``;
      this.appendChild(this.tmp.cloneNode(true));
      !this.page ? this.page = 1 : null;
    };
  };
};
