export default class Home extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  };

  async connectedCallback() {
    this.render();
  };

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet prefetch" href="/components/pages/home/style.css">
      <div id="fsm_container" class="fsm-container">
      </div>
    `
  };
};
