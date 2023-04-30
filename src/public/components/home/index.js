export default class Home extends HTMLElement {

  static get observedAttributes() { return ["loading"]; }

  constructor() {
    super();
  };

  get loading() {
    return JSON.parse(this.getAttribute("loading"));
  };

  set loading(v) {
    this.setAttribute("loading", JSON.stringify(v));
  };

  async getCard() {
    this.loading = true;
    const html = await fetch("/components/home/template.html", { mode: 'cors' })
    const tempStream = await html.text()
    this.base = tempStream;
    this.loading = false;
  };

  async connectedCallback() {
    await this.getCard();
    this.render();
    const fsmActual = document.createElement('div');
    fsmActual.setAttribute('id', 'fsm_actual');
    document.body.appendChild(fsmActual);
    const $fsm = document.querySelectorAll('.fsm');;
    const $fsmActual = document.querySelector('#fsm_actual');
    $fsmActual.style.position = "absolute";

    let position = {};
    let size = {};


    //modal action stuffs
    const openFSM = function (event) {
      console.log('here')
      const $this = event.currentTarget;
      position = $this.getBoundingClientRect();
      size = {
        width: window.getComputedStyle($this).width,
        height: window.getComputedStyle($this).height
      }

      $fsmActual.style.position = "absolute";
      $fsmActual.style.top = position.top + 'px';
      $fsmActual.style.left = position.left + 'px';
      $fsmActual.style.height = size.height;
      $fsmActual.style.width = size.width;
      $fsmActual.style.margin = $this.style.margin;

      setTimeout(function () {
        $fsmActual.innerHTML = $this.innerHTML;
        const classes = $this.classList.value.split(' ');
        for (let i = 0; i < classes.length; i++) {
          $fsmActual.classList.add(classes[i]);
        }
        $fsmActual.classList.add('growing');
        $fsmActual.style.height = '100vh';
        $fsmActual.style.width = '100vw';
        $fsmActual.style.top = '0';
        $fsmActual.style.left = '0';
        $fsmActual.style.margin = '0';
      }, 1);

      setTimeout(function () {
        $fsmActual.classList.remove('growing');
        $fsmActual.classList.add('full-screen')
      }, 1000);
    };

    const closeFSM = function (event) {
      const $this = event.currentTarget;

      $this.style.height = size.height;
      $this.style.width = size.width;
      $this.style.top = position.top + 'px';
      $this.style.left = position.left + 'px';
      $this.style.margin = '0';
      $this.classList.remove('full-screen');
      $this.classList.add('shrinking');

      setTimeout(function () {
        while ($this.firstChild) $this.removeChild($this.firstChild);
        const classList = $this.classList;
        while (classList.length > 0) {
          classList.remove(classList.item(0));
        }
        $this.style = '';;
      }, 1000);
    };

    for (let i = 0; i < $fsm.length; i++) {
      $fsm[i].addEventListener("click", openFSM);
    }
    console.log($fsm)
    $fsmActual.addEventListener("click", closeFSM);
  };

  htmlToElement(html) {
    const temp = document.createElement('template');
    temp.innerHTML += html;
    return temp.content;
  };

  render() {
    const tmp = this.htmlToElement(this.base);
    if (this.loading) {
      this.innerHTML = `Loading...`;
    } else {
      this.innerHTML = ``;
      this.appendChild(tmp.cloneNode(true));
    }
  };
};