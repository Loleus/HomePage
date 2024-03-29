export default class Spinner extends HTMLElement {

  async connectedCallback() {
    this.render();
  };

  render() {
    this.innerHTML = `
      <link rel="stylesheet" href="/components/vendors/spinner/style.css">
      <div class="spinner"></div>
      `;
  };
};