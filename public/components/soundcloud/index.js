export default class Soundcloud extends HTMLElement {
    static get observedAttributes() { return ["loading"]; }
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
    }
    get loading() {
      return JSON.parse(this.getAttribute("loading"));
    }
    set loading(v) {
      this.setAttribute("loading", JSON.stringify(v));
    }
    async getCard() {
      this.loading = true;
      const html = await fetch("/components/soundcloud/template.html", { mode: 'cors' })
      const tempStream = await html.text()
      this.base = tempStream;
      this.loading = false;
    }
  
    async connectedCallback() {
      this.shadowRoot.addEventListener("click", (e) => {
        console.log(e.target)
      });
      await this.getCard();
      this.render();
  console.log("jeb")
  const widgetIframe = this.shadowRoot.getElementById('sc-widget');
  const widget = SC.Widget(widgetIframe);
  widget.bind(SC.Widget.Events.READY, function () {
    widget.bind(SC.Widget.Events.PLAY, function () {
      widget.getCurrentSound(function (currentSound) {
        console.log('sound ' + currentSound.get('') + 'began to play');
      });
    });
    widget.getVolume(function (volume) {
      console.log('current volume value is ' + volume);
    });
    widget.setVolume(50);
  });
    }
    htmlToElement(html) {
      const temp = document.createElement('template');
      temp.innerHTML += html;
      return temp.content;
    }
    render() {
      const { shadowRoot } = this;
      const tmp = this.htmlToElement(this.base);
      if (this.loading) {
        shadowRoot.innerHTML = `Loading...`;
      } else {
        shadowRoot.innerHTML = ``;
        shadowRoot.appendChild(tmp.cloneNode(true));
      }
    }
  };