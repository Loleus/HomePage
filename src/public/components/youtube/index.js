export default class Youtube extends HTMLElement {

  async connectedCallback() {
    this.tmp = this.htmlToElement();
    this.render();
  }

  htmlToElement() {
    const temp = document.createElement('template');
    temp.innerHTML += `
      <link rel="stylesheet" href="/components/youtube/style.css">
      <iframe id="player" type="text/html" frameborder="0"></iframe>
    `;
    const playerI = temp.content.querySelector('#player');
    playerI.setAttribute('src', "https://www.youtube.com/embed?listType=playlist&list=PLkXJmTe_aZnZncsAHK4LgkP6kkt-ataG3");
    
    return temp.content;
  }

  render() {
    this.innerHTML = `<wc-spinner></wc-spinner>`;
    this.appendChild(this.tmp.cloneNode(true));
    player.style.visibility = "hidden"
    player.addEventListener('load', (e) => {
      player.style.visibility = "visible";
      this.removeChild(this.firstElementChild)
  })
  }
};
