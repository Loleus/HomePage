export default class Soundcloud extends HTMLElement {

  async connectedCallback() {
    this.tmp = this.htmlToElement();
    this.render();
  }

  htmlToElement() {
    const temp = document.createElement('template');
    temp.innerHTML += `
    <div class="container"><iframe id="scwidget" scrolling="no" frameborder="no" allow="autoplay"></iframe></div>
    <link rel="stylesheet" href="/components/pages/soundcloud/style.css">
    `;
    const player = temp.content.querySelector('#scwidget');
    player.setAttribute('src', "https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/loleus/");
    return temp.content;
  }

  render() {
    this.innerHTML = `<wc-spinner></wc-spinner>`;
    this.appendChild(this.tmp.cloneNode(true));
    scwidget.style.visibility = "hidden"
    scwidget.addEventListener('load', (e) => {
      scwidget.style.visibility = "visible";
      this.removeChild(this.firstElementChild)
  })
  }

};