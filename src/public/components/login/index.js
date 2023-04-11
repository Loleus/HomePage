export default class Login extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <link rel="stylesheet" href="/components/login/style.css">
    <form class="form" action="/login" method="POST">
      <input type="text" name="username" placeholder="Username" required>
      <input type="password" name="password" placeholder="Password" required>
      <input type="submit" value="LOGIN">
    </form>
    `;
  };
};
