export default class Contact extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <link rel="stylesheet" href="/components/contact/style.css">
    <h1 class="title">Feel free to <a href="mailto:07zglossie@wp.pl?subject=aboutCode">mail me</a></h1>
    `;
  }
}
