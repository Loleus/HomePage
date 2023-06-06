export default class NotFound extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="page">
        <h1 style="color:#aaa">Error 404</h1>
      </div>
    `;
  };
};


