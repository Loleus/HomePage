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

  async getCard() {
    const html = await fetch("/components/pages/photos/photos_card/template.html", { mode: 'cors' })
    const tempStream = await html.text()
    this.base = tempStream;
  };

  htmlToElement(html) {
    const temp = document.createElement('template');
    temp.innerHTML += html;
    return temp.content;
  };

  async connectedCallback() {

    await this.getCard();
    
    this.thumbUrl = `https://drive.google.com/thumbnail?id=${this.picid}`
    this.picUrl = `http://drive.google.com/uc?id=${this.picid}`;

    this.render();

    this.querySelector('#zoom').addEventListener('click', async () => {
      await this.showPic(this.picUrl)
    }, true )

  };

  getEditBtns(route, id) {
    if (route.includes("admin")) {
      return `
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
    } else {
      return ''
    }
  }

  async showPic(pic) {
    if (this.id && this.id !== null) {
      const tmp = this.htmlToElement(this.base);
      let cont = tmp.cloneNode(true);
      this.appendChild(cont);
      title.innerHTML = this.title;
      text.innerHTML = "loading...";
      const image = document.getElementById('img1');
      image.src = `${pic}`;
      image.onload =  () => {
        text.innerHTML = this.text;
        image.style = "background:bisque";
      };
    };
  }

  render() {
    this.innerHTML = `
    <link rel="stylesheet" href="/components/pages/photos/photos_card/style.css">
    <section style="background-image: url('${this.thumbUrl}')" class="blogCard">
      <li class="blogPost">
          <button class="blogPostTitle" id="zoom">${this.title}</button>
        <p class="blogPostText">${this.createdat}</p>
      </li>
      ${this.getEditBtns(window.location.href, this.id)}
    </section>`;
  };
};
