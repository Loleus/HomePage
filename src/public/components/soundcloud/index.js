export default class Soundcloud extends HTMLElement {

  async connectedCallback() {
    this.tmp = this.htmlToElement();
    this.render();
  }

  htmlToElement() {
    const temp = document.createElement('template');
    temp.innerHTML += `
    <link rel="stylesheet" href="/components/soundcloud/style.css">
    <div class="container"><iframe id="sc-widget" scrolling="no" frameborder="no" allow="autoplay"></iframe></div>
    `;
    const player = temp.content.querySelector('#sc-widget');
    player.setAttribute('src', "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/loleus/");
    return temp.content;
  }

  render() {
    this.innerHTML = ``;
    this.appendChild(this.tmp.cloneNode(true));
  }

};