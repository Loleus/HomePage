export default class Menu extends HTMLElement {
  static get observedAttributes() { return ["loading"]; }

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  }
  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  }
  async getCard() {
    this.loading = true;
    const html = await fetch("/components/menu/template.html", { mode: 'cors' })
    const tempStream = await html.text()
    this.base = tempStream;
    this.loading = false;
  }
  // functions of all event listners
  allEventListners() {
    // toggler icon click event
    this.navToggler.addEventListener('click', this.togglerClick);
    // nav links click event
    this.navLinks.forEach(elem => elem.addEventListener('click', this.navLinkClick));
  }

  // togglerClick function
  togglerClick() {
    this.navToggler.classList.toggle('toggler-open');
    this.navMenu.classList.toggle('open');
  }

  // navLinkClick function
  navLinkClick() {
    if (this.navMenu.classList.contains('open')) {
      this.navToggler.click();
    }
  }
  async connectedCallback() {
    await this.getCard();
    this.render();

  }
  htmlToElement(html) {
    const temp = document.createElement('template');
    temp.innerHTML += html;
    console.log(temp.content.querySelector('.nav-toggler'))
    return temp.content;
  }
  render() {
    const tmp = this.htmlToElement(this.base);
    if (this.loading) {
      this.innerHTML = `Loading...`;
    } else {
      this.innerHTML = ``;
      this.appendChild(tmp.cloneNode(true));
      this.navToggler = this.htmlToElement(this.base).querySelector('.nav-toggler');
      this.navMenu =this.htmlToElement(this.base).querySelector('.site-navbar ul');
      this.navLinks =this.htmlToElement(this.base).querySelectorAll('.site-navbar a');
      this.allEventListners();
    }
  }
};