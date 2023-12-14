export default class Card extends HTMLElement {

  get id() {
    return this.getAttribute("id");
  };

  get picid() {
    return this.getAttribute("picid");
  };

  get title() {
    return this.getAttribute("title");
  };

  get createdat() {
    return this.getAttribute("createdat");
  };

  get text() {
    return this.getAttribute("text");
  };

  async connectedCallback() {
    let img = new Image();
    this.render();
    img.onload = () => {
      this.querySelector("#zoom").style =`background-image: url("${this.thumbUrl}");animation:none`
      this.querySelector('#zoom').addEventListener('click', async () => {
        await this.showPic(this.picUrl)
      }, true )
    }
    this.thumbUrl = `https://drive.google.com/thumbnail?id=${this.picid}`
    img.src = this.thumbUrl;
    this.picUrl = `http://drive.google.com/uc?id=${this.picid}`;
  };

  getEditBtns(id) {
      return html`
        <link rel="stylesheet" href="/components/pages/photos/photos_card/editBtns.css">
        <div id="edit">
          <wc-router>
            <a class="editBtn" route="photos/edit/${id}">E</a>
            <wc-route path="/photos/edit/:id" title="Edit Post" component="wc-editphoto"></wc-route>
          </wc-router>
          <form class="deleteBtn-form" method='POST' action='/admin/${id}?_method=DELETE'>
           <button type='submit' class='btn-delete'>X</button>
          </form>
        </div>`
  }

  async showPic(pic) {
    if (this.id && this.id !== null) {
      const image = document.querySelector('.show');
      image.style = `background-image:url("${pic}"); display:block`;
    };
  }

  render() {
    this.innerHTML = `
    <link rel="stylesheet" href="/components/pages/photos/photos_card/style.css">
    <section id="zoom" class="blogCard">
      ${window.location.href.includes("admin") ? this.getEditBtns(this.id) : ''}
    </section>`;
  };
};
