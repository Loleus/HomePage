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

  connectedCallback() {
    this.thumbUrl = `https://drive.google.com/thumbnail?id=${this.picid}`
    this.render()
  };

  getEditBtns(route, id) {
    if (route.includes("admin")) {
      return `
        <link rel="stylesheet" href="/components/photos_card/editBtns.css">
        <div id="edit">
          <wc-router>
            <a class="editBtn" route="photos/edit/${id}">E</a>
            <wc-route path="/photos/edit/:id" title="Edit Post" component="wc-editphoto"></wc-route>
          </wc-router>
          <form class="deleteBtn-form" method='POST' action='/admin/${id}?_method=DELETE'>
           <button type='submit' class='btn-delete'>X</button>
          </form>
        </div>`
    } else {
      return ''
    }
  }

  render() {
    this.innerHTML = `
    <link rel="stylesheet" href="/components/photos_card/style.css">
    <section style="background-image: url('${this.thumbUrl}')" class="blogCard">
      <li class="blogPost">
        <wc-router>
          <a class="blogPostTitle" route="photos/${this.id}">${this.title}</a>
          <wc-route path="/photos/:id" title="Photo Details" component="wc-photo"></wc-route>
        </wc-router>
        <p class="blogPostText">${this.createdat}</p>
      </li>
      ${this.getEditBtns(window.location.href, this.id)}
    </section>`;
  };
};
